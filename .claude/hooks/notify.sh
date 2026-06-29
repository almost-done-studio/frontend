#!/bin/bash
INPUT=$(cat)
EVENT=$(echo "$INPUT" | jq -r '.hook_event_name // "notification"')
if command -v osascript &>/dev/null; then
  osascript -e "display notification \"$EVENT\" with title \"AlmostDoneStudio\" subtitle \"Claude needs attention\""
elif command -v notify-send &>/dev/null; then
  notify-send "AlmostDoneStudio" "Claude: $EVENT"
fi
