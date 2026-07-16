#!/bin/bash
# Shared protect-files policy. Invoked by thin .cursor / .claude wrappers.
# Env: AGENT_HOOK_FORMAT=cursor|claude (default cursor)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../lib/host.sh
source "$ROOT/hooks/lib/host.sh"

FORMAT="${AGENT_HOOK_FORMAT:-cursor}"
INPUT=$(cat)
PATH_VAL="$(agent_hooks_extract_path "$INPUT")"
RESULT="$(agent_hooks_policy_protect "$PATH_VAL")"

if [ "$FORMAT" = "claude" ]; then
  agent_hooks_emit_claude "$RESULT"
fi
agent_hooks_emit_cursor "$RESULT"
exit 0
