#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat || true)
agent_hooks_require_host claude "$INPUT" silence

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
LAST=$(git log --oneline -1 2>/dev/null || echo "no commits")
MILESTONE=$(cat .claude/MILESTONE 2>/dev/null || echo "Milestone 1")
MODIFIED_COUNT=$(git diff --name-only 2>/dev/null | wc -l | tr -d ' ')

echo "[$MILESTONE] branch:$BRANCH | $LAST | uncommitted:$MODIFIED_COUNT files"
echo "Stack: React+Phaser+TS+Vite. Touch-only. EventBus only. /plan before new features."
