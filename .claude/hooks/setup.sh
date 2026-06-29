#!/bin/bash
# Runs on: claude --init
echo "=== AlmostDoneStudio Frontend Setup ==="

# Check Node
NODE_VERSION=$(node -v 2>/dev/null)
if [ -z "$NODE_VERSION" ]; then
  echo "ERROR: Node.js not found. Install from nodejs.org" >&2; exit 1
fi
echo "✓ Node $NODE_VERSION"

# Check jq — required for PostToolUse prettier hook
if ! command -v jq &>/dev/null; then
  echo "WARNING: jq not found — installing..."
  if command -v brew &>/dev/null; then brew install jq
  elif command -v apt-get &>/dev/null; then sudo apt-get install -y jq
  else echo "ERROR: install jq manually: https://jqlang.github.io/jq/" >&2; exit 1
  fi
fi
echo "✓ jq $(jq --version)"

# Install deps
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."; npm install
fi
echo "✓ Dependencies ready"

# Create .env from example
if [ ! -f ".env" ] && [ -f ".env.example" ]; then
  cp .env.example .env
  echo "✓ Created .env from .env.example — fill in your values"
fi

if [ -n "$CLAUDE_ENV_FILE" ]; then
  echo "PROJECT_ROOT=$(git rev-parse --show-toplevel)" >> "$CLAUDE_ENV_FILE"
  echo "NODE_ENV=development" >> "$CLAUDE_ENV_FILE"
fi

# Check milestone freshness
MILESTONE_FILE=".claude/MILESTONE"
if [ -f "$MILESTONE_FILE" ]; then
  LAST_MODIFIED=$(date -r "$MILESTONE_FILE" +%s 2>/dev/null || stat -c %Y "$MILESTONE_FILE" 2>/dev/null)
  NOW=$(date +%s)
  DAYS_OLD=$(( (NOW - LAST_MODIFIED) / 86400 ))
  if [ "$DAYS_OLD" -gt 14 ]; then
    echo "⚠️  MILESTONE file is $DAYS_OLD days old — update .claude/MILESTONE"
  fi
fi

echo ""; echo "✓ Setup complete. Run: npm run dev"
