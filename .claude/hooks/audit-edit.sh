#!/bin/bash
# Runs on: after every Edit|Write (async — doesn't block Claude)
# Purpose: log all file changes for audit trail

INPUT=$(cat)
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // "unknown"')
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
LOG_FILE=".claude/audit.log"

echo "$TIMESTAMP | EDIT | $FILE_PATH" >> "$LOG_FILE"
