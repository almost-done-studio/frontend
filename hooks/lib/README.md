# Shared agent hook helpers

Used by both `.claude/hooks/` and `.cursor/hooks/`.

## Layout

| Path | Role |
|------|------|
| `hooks/lib/host.sh` | Host detect + policy helpers + emit formatters |
| `hooks/shared/protect-files.sh` | **One** protect policy |
| `hooks/shared/validate-command.sh` | **One** validate policy |
| `.cursor/hooks/*` | Thin wrappers: require `cursor` → shared → Cursor JSON |
| `.claude/hooks/*` | Thin wrappers: require `claude` → shared → exit 0/2 |

## Host rules (strict)

- Claude wrappers run **only** when host == `claude`
- Cursor wrappers run when host != `claude` (`cursor` or `unknown`)
- Under Cursor, Claude scripts always no-op → no double-fire

Override for tests: `AGENT_HOST_OVERRIDE=cursor|claude`

## Smoke

```bash
bash hooks/smoke.sh
```

Must be green before merging hook changes.
