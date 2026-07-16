#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat)
agent_hooks_require_host cursor "$INPUT" silence

FILE=$(echo "$INPUT" | jq -r '.file_path // empty' 2>/dev/null || true)
[ -z "$FILE" ] && exit 0
case "$FILE" in
  *.ts|*.tsx|*.js|*.jsx|*.json|*.css|*.md|*.mdc|*.yml|*.yaml|*.html)
    if [ -x "$ROOT/node_modules/.bin/prettier" ]; then
      "$ROOT/node_modules/.bin/prettier" --write --ignore-unknown "$FILE" 2>/dev/null || true
    else
      npx prettier --write --ignore-unknown "$FILE" 2>/dev/null || true
    fi
    ;;
esac
exit 0
