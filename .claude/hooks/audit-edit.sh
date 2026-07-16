#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat)
agent_hooks_require_host claude "$INPUT" silence

FILE=$(echo "$INPUT" | jq -r '.tool_input.file_path // .file_path // "unknown"')
echo "$(date '+%Y-%m-%d %H:%M:%S') | EDIT | $FILE" >> ".claude/audit.log"
exit 0
