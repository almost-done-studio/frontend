#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat || true)
agent_hooks_require_host cursor "$INPUT" empty

BACKUP_DIR=".cursor/backups"
mkdir -p "$BACKUP_DIR"
TIMESTAMP=$(date '+%Y-%m-%d_%H-%M')
BACKUP_FILE="$BACKUP_DIR/backup-$TIMESTAMP.md"

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
MODIFIED=$(git diff --name-only 2>/dev/null || echo "none")
STAGED=$(git diff --cached --name-only 2>/dev/null || echo "none")
LAST_COMMITS=$(git log --oneline -5 2>/dev/null || echo "none")
MILESTONE=$(cat .cursor/MILESTONE 2>/dev/null || echo "Milestone 1")

cat > "$BACKUP_FILE" << BACKUP
# Context Backup — $TIMESTAMP
## State
- Branch: $BRANCH
- Milestone: $MILESTONE
## Last 5 Commits
$LAST_COMMITS
## Modified (uncommitted)
$MODIFIED
## Staged
$STAGED
## Stack
React + Phaser + TypeScript + Vite → Capacitor. 390x844. Touch-only. EventBus.
BACKUP

MSG="Backed up to $BACKUP_FILE | Branch: $BRANCH | $MILESTONE"
ls -t "$BACKUP_DIR"/backup-*.md 2>/dev/null | tail -n +11 | while read -r f; do rm -f "$f"; done

jq -n --arg msg "$MSG" '{additional_context: $msg}'
