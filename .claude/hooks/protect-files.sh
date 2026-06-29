#!/bin/bash
INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty')
[ -z "$FILE_PATH" ] && exit 0

BLOCKED=("\.env$" "\.env\.local$" "\.env\.production$" "secrets/" "package-lock\.json$")
for pattern in "${BLOCKED[@]}"; do
  if echo "$FILE_PATH" | grep -qE "$pattern"; then
    echo "BLOCKED: $FILE_PATH matches protected pattern '$pattern'" >&2
    exit 2
  fi
done
exit 0
