#!/bin/bash
# Shared validate-command policy. Invoked by thin .cursor / .claude wrappers.
# Env: AGENT_HOOK_FORMAT=cursor|claude (default cursor)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../lib/host.sh
source "$ROOT/hooks/lib/host.sh"

FORMAT="${AGENT_HOOK_FORMAT:-cursor}"
INPUT=$(cat)
CMD="$(agent_hooks_extract_command "$INPUT")"
RESULT="$(agent_hooks_policy_validate "$CMD")"

if [ "$FORMAT" = "claude" ]; then
  agent_hooks_emit_claude "$RESULT"
fi
agent_hooks_emit_cursor "$RESULT"
exit 0
