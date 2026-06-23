---
name: commit
description: Commit message format for AlmostDoneStudio frontend. Apply when creating git commits.
---

# Commit Format — AlmostDoneStudio Frontend

## Format
```
<type>: <what changed> [scope]
```

## Types
| Type | When |
|------|------|
| `init` | First commit, project bootstrap |
| `add` | New file, feature, component, scene |
| `update` | Change to existing functionality |
| `fix` | Bug fix |
| `delete` | Remove file or code |
| `setup` | Config, tooling, environment |
| `refactor` | Restructure, no behavior change |
| `style` | Formatting only, no logic change |

## Scopes
`[scene]` `[component]` `[api]` `[store]` `[hook]` `[types]` `[config]` `[skill]`

## Examples
```
add: GameScene with top-down movement [scene]
add: CharacterSelect screen with 5 starters [component]
fix: sprite direction not switching on left movement [scene]
update: EventBus types for location-changed event [types]
setup: Phaser scale config for 390x844 mobile [config]
refactor: extract movement to usePlayerMovement hook [hook]
delete: unused placeholder assets from public/
```

## Rules
- English only, lowercase after type, no period, max 72 chars
- Never: "fix bug", "update stuff", "wip", "temp", "changes"
- Branch must match type: feature/xxx → add/update, fix/xxx → fix
