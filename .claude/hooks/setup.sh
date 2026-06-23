#!/bin/bash
# Runs on: claude --init
# Purpose: prepare dev environment automatically

echo "=== almost-done-studio Frontend Setup ==="

# Check Node version
NODE_VERSION=$(node -v 2>/dev/null)
if [ -z "$NODE_VERSION" ]; then
  echo "ERROR: Node.js not found. Install from nodejs.org"
  exit 1
fi
echo "✓ Node $NODE_VERSION"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  npm install
fi
echo "✓ Dependencies installed"

# Check .env
if [ ! -f ".env" ]; then
  if [ -f ".env.example" ]; then
    cp .env.example .env
    echo "✓ Created .env from .env.example — fill in your values"
  else
    echo "WARNING: No .env.example found"
  fi
fi

# Write env vars for this session
echo "PROJECT_ROOT=$(git rev-parse --show-toplevel)" >> "$CLAUDE_ENV_FILE"
echo "NODE_ENV=development" >> "$CLAUDE_ENV_FILE"

echo ""
echo "Setup complete. Run: npm run dev"
