#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat)
agent_hooks_require_host cursor "$INPUT" silence

FILE=$(echo "$INPUT" | jq -r '.file_path // .tool_input.path // .tool_input.file_path // "unknown"' 2>/dev/null || echo "unknown")
echo "$(date '+%Y-%m-%d %H:%M:%S') | EDIT | $FILE" >> ".cursor/audit.log"
exit 0
