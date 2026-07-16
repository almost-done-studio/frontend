#!/bin/bash
# Manual/bootstrap only — not wired to sessionStart.
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat || true)
agent_hooks_require_host cursor "$INPUT" silence

echo "=== AlmostDoneStudio Frontend Setup ===" >&2

NODE_VERSION=$(node -v 2>/dev/null)
if [ -z "$NODE_VERSION" ]; then
  echo "ERROR: Node.js not found. Install from nodejs.org" >&2
  exit 1
fi
echo "✓ Node $NODE_VERSION" >&2

if ! command -v jq &>/dev/null; then
  echo "WARNING: jq not found — install jq for hooks" >&2
  if command -v brew &>/dev/null; then brew install jq; fi
fi
if command -v jq &>/dev/null; then
  echo "✓ jq $(jq --version)" >&2
fi

if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..." >&2
  npm install
fi
echo "✓ Dependencies ready" >&2

if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  cp .env.example .env
  echo "✓ Created .env from .env.example" >&2
fi

MILESTONE_FILE=".cursor/MILESTONE"
if [ -f "$MILESTONE_FILE" ]; then
  LAST_MODIFIED=$(date -r "$MILESTONE_FILE" +%s 2>/dev/null || stat -c %Y "$MILESTONE_FILE" 2>/dev/null)
  NOW=$(date +%s)
  DAYS_OLD=$(( (NOW - LAST_MODIFIED) / 86400 ))
  if [ "$DAYS_OLD" -gt 14 ]; then
    echo "⚠️  MILESTONE is $DAYS_OLD days old — update .cursor/MILESTONE" >&2
  fi
fi

echo "" >&2
echo "✓ Setup complete. Run: npm run dev" >&2
exit 0
