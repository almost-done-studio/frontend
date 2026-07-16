#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat)
agent_hooks_require_host claude "$INPUT" silence

EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // "notification"')
if command -v osascript &>/dev/null; then
  osascript -e "display notification \"$EVENT\" with title \"AlmostDoneStudio\" subtitle \"Claude needs attention\"" 2>/dev/null || true
elif command -v notify-send &>/dev/null; then
  notify-send "AlmostDoneStudio" "Claude: $EVENT" 2>/dev/null || true
fi
exit 0
