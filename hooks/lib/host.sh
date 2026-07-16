#!/bin/bash
# Shared host detection for Claude Code vs Cursor hooks.
# Source: source "$ROOT/hooks/lib/host.sh"

# Prints: cursor | claude | unknown
agent_hooks_detect_host() {
  local input="${1:-}"

  case "${AGENT_HOST_OVERRIDE:-}" in
    cursor|claude)
      echo "$AGENT_HOST_OVERRIDE"
      return 0
      ;;
  esac

  if [ -n "${CURSOR_VERSION:-}" ] || [ -n "${CURSOR_AGENT:-}" ]; then
    echo cursor
    return 0
  fi

  if [ -n "$input" ] && command -v jq >/dev/null 2>&1; then
    if echo "$input" | jq -e '.cursor_version != null' >/dev/null 2>&1; then
      echo cursor
      return 0
    fi

    local ev
    ev="$(echo "$input" | jq -r '.hook_event_name // empty' 2>/dev/null || true)"
    case "$ev" in
      beforeShellExecution|afterShellExecution|beforeReadFile|afterFileEdit|beforeTabFileRead|afterTabFileEdit|sessionStart|sessionEnd|beforeSubmitPrompt|beforeMCPExecution|afterMCPExecution|afterAgentResponse|afterAgentThought|subagentStart|subagentStop|workspaceOpen|preCompact)
        echo cursor
        return 0
        ;;
      PreToolUse|PostToolUse|PostToolUseFailure|SessionStart|PreCompact|Stop|Setup|Notification)
        echo claude
        return 0
        ;;
      preToolUse|postToolUse|postToolUseFailure|stop)
        if echo "$input" | jq -e '(.file_path != null) or (.command != null and .tool_input == null) or (.generation_id != null) or (.workspace_roots != null)' >/dev/null 2>&1; then
          echo cursor
          return 0
        fi
        ;;
    esac

    if echo "$input" | jq -e '.file_path != null and .tool_input == null' >/dev/null 2>&1; then
      echo cursor
      return 0
    fi
    if echo "$input" | jq -e '.command != null and .tool_input == null' >/dev/null 2>&1; then
      echo cursor
      return 0
    fi
  fi

  if [ -n "${CLAUDE_CODE_ENTRYPOINT:-}" ] || [ -n "${CLAUDE_PLUGIN_ROOT:-}" ] || [ -n "${CLAUDE_SESSION_ID:-}" ]; then
    echo claude
    return 0
  fi

  echo unknown
}

agent_hooks_noop() {
  local mode="${1:-permission}"
  case "$mode" in
    permission) echo '{"permission":"allow"}' ;;
    empty) echo '{}' ;;
    silence) ;;
    *) echo '{"permission":"allow"}' ;;
  esac
  exit 0
}

# expected: claude | cursor
# mode: permission | empty | silence
#
# Strict (no double-fire):
# - Claude wrappers run ONLY when host == claude
# - Cursor wrappers run when host != claude (cursor or unknown)
agent_hooks_require_host() {
  local expected="$1"
  local input="${2:-}"
  local mode="${3:-permission}"
  local host
  host="$(agent_hooks_detect_host "$input")"

  if [ "$expected" = "claude" ] && [ "$host" != "claude" ]; then
    agent_hooks_noop "$mode"
  fi

  if [ "$expected" = "cursor" ] && [ "$host" = "claude" ]; then
    agent_hooks_noop "$mode"
  fi

  return 0
}

# --- Shared policy helpers (used by hooks/shared/*) ---

agent_hooks_extract_path() {
  local input="$1"
  echo "$input" | jq -r '.file_path // .tool_input.path // .tool_input.file_path // empty' 2>/dev/null || true
}

agent_hooks_extract_command() {
  local input="$1"
  echo "$input" | jq -r '.command // .tool_input.command // empty' 2>/dev/null || true
}

# Prints: allow | deny:<reason>
agent_hooks_policy_protect() {
  local path="$1"
  if [ -z "$path" ]; then
    echo allow
    return 0
  fi
  local pattern
  for pattern in \
    '\.env$' \
    '\.env\.local$' \
    '\.env\.production$' \
    '\.env\.development$' \
    '\.env\.test$' \
    '\.env\.staging$' \
    '\.env\.ci$' \
    'secrets/'
  do
    if echo "$path" | grep -qE "$pattern"; then
      echo "deny:BLOCKED: $path matches protected pattern '$pattern'"
      return 0
    fi
  done
  echo allow
}

# True if $1 looks like a shell token start (not buried in a quoted echo string).
# We check the full command but require the dangerous form near a command boundary.
agent_hooks_policy_validate() {
  local cmd="$1"
  if [ -z "$cmd" ]; then
    echo allow
    return 0
  fi

  # Strip simple single/double quoted spans to reduce false positives from echo 'rm -rf /'
  local stripped
  stripped="$(printf '%s' "$cmd" | sed -E "s/'[^']*'//g; s/\"[^\"]*\"//g")"

  if echo "$stripped" | grep -qiE '(^|[[:space:];|&])rm[[:space:]]+-rf[[:space:]]+/' ; then
    echo "deny:BLOCKED: destructive rm of root"
    return 0
  fi
  if echo "$stripped" | grep -qiE '(^|[[:space:];|&])rm[[:space:]]+-rf[[:space:]]+\*' ; then
    echo "deny:BLOCKED: destructive rm wildcard"
    return 0
  fi
  if echo "$stripped" | grep -qiE 'curl[^|;]*\|[[:space:]]*bash([[:space:]]|$)' ; then
    echo "deny:BLOCKED: curl piped to bash"
    return 0
  fi
  if echo "$stripped" | grep -qiE 'curl[^|;]*\|[[:space:]]*sh([[:space:]]|$)' ; then
    echo "deny:BLOCKED: curl piped to sh"
    return 0
  fi
  if echo "$stripped" | grep -qiE '(^|[[:space:];|&])git[[:space:]]+push[[:space:]].*(--force|-f)([[:space:]]|$)' ; then
    echo "deny:BLOCKED: git force push"
    return 0
  fi
  if echo "$stripped" | grep -qiE '(^|[[:space:];|&])git[[:space:]]+reset[[:space:]].*--hard' ; then
    echo "deny:BLOCKED: git reset --hard"
    return 0
  fi
  if echo "$stripped" | grep -qiE '(^|[[:space:];|&])(DROP|drop)[[:space:]]+(TABLE|table)' ; then
    echo "deny:BLOCKED: DROP TABLE"
    return 0
  fi

  echo allow
}

# Emit Cursor JSON for a policy result (allow | deny:reason)
agent_hooks_emit_cursor() {
  local result="$1"
  if [ "$result" = "allow" ]; then
    echo '{"permission":"allow"}'
    return 0
  fi
  local msg="${result#deny:}"
  jq -nc --arg msg "$msg" '{permission:"deny", user_message:$msg, agent_message:$msg}'
}

# Emit Claude exit semantics for a policy result
agent_hooks_emit_claude() {
  local result="$1"
  if [ "$result" = "allow" ]; then
    exit 0
  fi
  echo "${result#deny:}" >&2
  exit 2
}
