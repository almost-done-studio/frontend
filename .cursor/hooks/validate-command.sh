#!/bin/bash
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
# shellcheck source=../../hooks/lib/host.sh
source "$ROOT/hooks/lib/host.sh"

INPUT=$(cat)
agent_hooks_require_host cursor "$INPUT" permission

printf '%s' "$INPUT" | AGENT_HOOK_FORMAT=cursor "$ROOT/hooks/shared/validate-command.sh"
