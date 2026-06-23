#!/bin/bash
# Runs on: every session start, resume, and after compaction
# Purpose: inject fresh project context so Claude doesn't start blind

BRANCH=$(git branch --show-current 2>/dev/null || echo "unknown")
LAST_COMMITS=$(git log --oneline -3 2>/dev/null || echo "no commits yet")
MODIFIED=$(git diff --name-only 2>/dev/null | head -5)
MILESTONE="Milestone 1 — Foundation (week 1-2)"

echo "=== almost-done-studio — Session Context ==="
echo "Branch: $BRANCH"
echo "Current milestone: $MILESTONE"
echo ""
echo "Last commits:"
echo "$LAST_COMMITS"

if [ -n "$MODIFIED" ]; then
  echo ""
  echo "Modified files (uncommitted):"
  echo "$MODIFIED"
fi

echo ""
echo "Stack: React + Phaser + TypeScript + Vite"
echo "Rules: /plan before new features. Branch from develop. No push without PR."
echo "Reminder: touch only mobile-first (44px targets, no hover, touch events only)"
