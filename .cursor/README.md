# `.cursor/` — Cursor agent config

## Layout

| Path | Purpose |
|------|---------|
| `rules/` | Always-on / glob rules (`.mdc`) |
| `skills/` | On-demand skills (`/ship`, `/new-scene`, …) |
| `agents/` | Subagents |
| `hooks/` + `hooks.json` | Cursor lifecycle hooks |
| `MILESTONE` | Milestone checklist |

Policy logic lives in **`hooks/shared/`** (shared with Claude). Wrappers here only gate host + format JSON.

## Dual Cursor + Claude (no caveats)

1. **One policy** — `hooks/shared/protect-files.sh`, `hooks/shared/validate-command.sh`
2. **Strict host gate** — Claude wrappers no-op unless host is Claude; Cursor is canonical under Cursor
3. **Smoke** — `bash hooks/smoke.sh` before merge
4. **No Stop prompt in committed `.claude/settings.json`** — see `.claude/hooks/STOP.local.md` (Cursor cannot gate prompt hooks)

Optional: Cursor Settings → disable third-party Claude config import (extra safety).

## Lockout recovery

1. `mv .cursor/hooks.json .cursor/hooks.json.bak`
2. Fix allow paths to always print `{"permission":"allow"}`
3. Restore `hooks.json` only after `bash hooks/smoke.sh` passes

## Manual setup

```bash
.cursor/hooks/setup.sh
```
