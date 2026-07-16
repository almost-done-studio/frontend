#!/bin/bash
# Hook smoke tests — run: bash hooks/smoke.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

pass=0
fail=0

assert_contains() {
  local name="$1" got="$2" needle="$3"
  if echo "$got" | grep -qF "$needle"; then
    echo "PASS  $name"
    pass=$((pass + 1))
  else
    echo "FAIL  $name (missing '$needle')"
    echo "      got: $got"
    fail=$((fail + 1))
  fi
}

assert_exit() {
  local name="$1" got="$2" want="$3"
  if [ "$got" = "$want" ]; then
    echo "PASS  $name"
    pass=$((pass + 1))
  else
    echo "FAIL  $name exit=$got want=$want"
    fail=$((fail + 1))
  fi
}

assert_eq() {
  local name="$1" got="$2" want="$3"
  if [ "$got" = "$want" ]; then
    echo "PASS  $name"
    pass=$((pass + 1))
  else
    echo "FAIL  $name"
    echo "      got:  $got"
    echo "      want: $want"
    fail=$((fail + 1))
  fi
}

chmod +x hooks/lib/host.sh hooks/shared/*.sh hooks/smoke.sh .cursor/hooks/*.sh .claude/hooks/*.sh 2>/dev/null || true

echo "=== Cursor protect ==="
out="$(echo '{"hook_event_name":"beforeReadFile","file_path":"/tmp/ok.ts","cursor_version":"1"}' | .cursor/hooks/protect-files.sh)"
assert_contains "cursor allow file" "$out" '"permission":"allow"'

out="$(echo '{"hook_event_name":"beforeReadFile","file_path":"/tmp/.env","cursor_version":"1"}' | .cursor/hooks/protect-files.sh)"
assert_contains "cursor deny .env" "$out" '"permission":"deny"'

echo "=== Claude under Cursor (no-op) ==="
out="$(echo '{"hook_event_name":"beforeReadFile","file_path":"/tmp/.env","cursor_version":"1"}' | .claude/hooks/protect-files.sh)"
assert_contains "claude no-op on cursor payload" "$out" '"permission":"allow"'

echo "=== Claude native ==="
set +e
echo '{"hook_event_name":"PreToolUse","tool_input":{"file_path":"/tmp/.env"}}' | AGENT_HOST_OVERRIDE=claude .claude/hooks/protect-files.sh >/tmp/hooks-smoke-out.txt 2>/tmp/hooks-smoke-err.txt
ec=$?
set -e
assert_exit "claude deny .env exit" "$ec" "2"
assert_contains "claude deny .env stderr" "$(cat /tmp/hooks-smoke-err.txt)" "BLOCKED"

set +e
echo '{"hook_event_name":"PreToolUse","tool_input":{"file_path":"/tmp/ok.ts"}}' | AGENT_HOST_OVERRIDE=claude .claude/hooks/protect-files.sh >/dev/null 2>&1
ec=$?
set -e
assert_exit "claude allow file exit" "$ec" "0"

echo "=== Cursor validate ==="
out="$(echo '{"hook_event_name":"beforeShellExecution","command":"git status","cursor_version":"1"}' | .cursor/hooks/validate-command.sh)"
assert_contains "cursor allow git status" "$out" '"permission":"allow"'

out="$(echo '{"hook_event_name":"beforeShellExecution","command":"npm run lint","cursor_version":"1"}' | .cursor/hooks/validate-command.sh)"
assert_contains "cursor allow npm run lint" "$out" '"permission":"allow"'

out="$(echo '{"hook_event_name":"beforeShellExecution","command":"git push origin main --force","cursor_version":"1"}' | .cursor/hooks/validate-command.sh)"
assert_contains "cursor deny force push" "$out" '"permission":"deny"'

out="$(echo '{"hook_event_name":"beforeShellExecution","command":"echo '\''rm -rf /'\''","cursor_version":"1"}' | .cursor/hooks/validate-command.sh)"
assert_contains "cursor allow quoted rm text" "$out" '"permission":"allow"'

echo "=== Claude validate under Cursor ==="
out="$(echo '{"hook_event_name":"beforeShellExecution","command":"git push --force","cursor_version":"1"}' | .claude/hooks/validate-command.sh)"
assert_contains "claude validate no-op on cursor" "$out" '"permission":"allow"'

echo "=== Shared policy unit ==="
# shellcheck source=hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"
assert_eq "policy protect ok" "$(agent_hooks_policy_protect '/app/src/x.ts')" "allow"
assert_eq "policy validate status" "$(agent_hooks_policy_validate 'git status')" "allow"
assert_eq "policy validate force" "$(agent_hooks_policy_validate 'git push origin main --force')" "deny:BLOCKED: git force push"

echo
echo "Result: $pass passed, $fail failed"
[ "$fail" -eq 0 ]
