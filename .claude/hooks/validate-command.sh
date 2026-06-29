#!/bin/bash
INPUT=$(cat)
COMMAND=$(echo "$INPUT" | jq -r '.tool_input.command // empty')
[ -z "$COMMAND" ] && exit 0

DANGEROUS=("rm -rf /" "rm -rf \*" "curl.*\|.*bash" "curl.*\|.*sh" "git push.*--force" "git push.*-f " "git reset.*--hard" "git add \\.$" "git add -A" "DROP TABLE" "drop table")
for pattern in "${DANGEROUS[@]}"; do
  if echo "$COMMAND" | grep -qiE "$pattern"; then
    echo "BLOCKED: dangerous pattern '$pattern' in: $COMMAND" >&2; exit 2
  fi
done
exit 0
