# Optional Claude-only Stop checklist (NOT in committed settings.json)

Cursor may import `.claude/settings.json` as third-party hooks. Prompt-type
`Stop` hooks cannot be gated by `hooks/lib/host.sh`, so the Stop checklist
must live only in a **local** Claude config.

## Enable in Claude Code only

Copy into `.claude/settings.local.json` (gitignored) under `"hooks"`:

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "prompt",
            "prompt": "If src/ files changed this session, check: tasks done, no any, no cross React/Phaser imports, no secrets. Incomplete → {\"decision\":\"block\",\"reason\":\"...\"}. Else {\"decision\":\"allow\"}."
          }
        ]
      }
    ]
  }
}
```

Do not add this to the committed `.claude/settings.json`.
