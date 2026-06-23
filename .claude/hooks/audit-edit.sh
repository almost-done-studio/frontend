#!/bin/bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // "unknown"')
echo "$(date '+%Y-%m-%d %H:%M:%S') | EDIT | $FILE" >> ".claude/audit.log"
