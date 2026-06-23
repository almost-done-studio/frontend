#!/bin/bash
# Runs on: any Edit|Write|Read tool use
# Purpose: block access to sensitive files

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')

if [ -z "$FILE_PATH" ]; then
  exit 0
fi

# Block sensitive files
BLOCKED_PATTERNS=(
  ".env$"
  ".env.local$"
  ".env.production$"
  "secrets/"
  "package-lock.json"
)

for pattern in "${BLOCKED_PATTERNS[@]}"; do
  if echo "$FILE_PATH" | grep -qE "$pattern"; then
    echo "BLOCKED: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done

exit 0
