#!/bin/bash
# Runs on: every Bash tool use
# Purpose: block dangerous commands before execution

INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')

if [ -z "$COMMAND" ]; then
  exit 0
fi

DANGEROUS_PATTERNS=(
  "rm -rf /"
  "rm -rf \*"
  "curl.*|.*bash"
  "curl.*|.*sh"
  "git push.*--force"
  "git push.*-f "
  "drop table"
  "DROP TABLE"
)

for pattern in "${DANGEROUS_PATTERNS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$pattern"; then
    echo "BLOCKED: Dangerous command pattern detected: '$pattern'" >&2
    echo "Command was: $COMMAND" >&2
    exit 2
  fi
done

exit 0
