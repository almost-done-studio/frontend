#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat)
agent_hooks_require_host cursor "$INPUT" empty

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
LAST=$(git log --oneline -1 2>/dev/null || echo "no commits")
MILESTONE=$(cat .cursor/MILESTONE 2>/dev/null || echo "Milestone 1")
MODIFIED_COUNT=$(git diff --name-only 2>/dev/null | wc -l | tr -d ' ')

CONTEXT="[$MILESTONE] branch:$BRANCH | $LAST | uncommitted:$MODIFIED_COUNT files
Stack: React+Phaser+TS+Vite. Touch-only. EventBus only. Plan before new features."

jq -n --arg ctx "$CONTEXT" '{additional_context: $ctx}'
