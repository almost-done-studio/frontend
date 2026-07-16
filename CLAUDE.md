# Frontend — AlmostDoneStudio

See @README.md for project overview.
See @.claude/AGENTS.md for cross-tool agent config.

## Project
Mobile top-down game, medieval manuscript / marginalia aesthetic.
Player picks a character, explores a map, interacts with the world.
Target: mobile browser → Capacitor (Android/iOS).
Base resolution: 390x844 (iPhone 14).

## Commands
```bash
npm run dev      # local dev server
npm run build    # production build
npm run lint     # eslint
npm run test     # vitest
npm run preview  # preview production build
```

## Architecture
React = UI layer (menus, HUD, screens).
Phaser = game world (movement, sprites, collisions, tilemap).
They communicate ONLY via EventBus — never import one into the other.

```ts
EventBus.emit('location-changed', { name: 'Forest' }) // Phaser → React
EventBus.emit('player-action', { type: 'move' })      // React → Phaser
```

## Structure
```
src/
├── scenes/      # Phaser.Scene subclasses only. One file = one scene.
├── components/  # React functional components only
├── store/       # Zustand — global state
├── api/         # Backend requests (axios)
├── hooks/       # Custom React hooks
├── types/       # TypeScript interfaces
├── constants/   # GAME_CONFIG, CHARACTERS, SCENES, API
└── utils/       # Pure functions, EventBus
```

## Rules

**TypeScript**
- No `any` — use `unknown` or explicit type.
  Reason: runtime bugs in game logic are hard to trace.
- All component props typed via named interfaces.

**React**
- Functional components only, no classes.
- No inline styles — CSS modules or Tailwind only.
- No Phaser imports inside React files. Ever.

**Phaser**
- Never create objects inside `update()` — only in `create()`.
  Reason: memory leaks and frame drops on mobile.
- Load all assets in `preload()`, never in `create()`.
- No React imports inside Phaser scenes. Ever.

**Mobile-first**
- All tappable elements: minimum 44×44px.
- No hover states — touch only.
- Scale: `mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH`

**Always**
- Constants in `src/constants/` — never hardcode values inline.
- `/plan` before implementing new scenes or complex features.
- Branch from `develop`: `feature/xxx` or `fix/xxx`.

**Never**
- Push directly to `main` or `develop` — always PR.
- Commit `.env` or any secrets.
- `console.log` in production code.
- Mutate Zustand state outside store actions.

## Compact Instructions
When compacting: preserve list of modified files, current task, architecture decisions and their rationale.

## Skills
`.claude/skills/` and `.cursor/skills/` — load on demand:
- `phaser/`       — Phaser 3 patterns, tilemap, mobile input
- `commit/`       — commit message format
- `code-review/`  — pre-PR checklist with auto-checks
- `ship/`         — prepare PR (Cursor: `/ship`)
- `new-scene/`    — scaffold Phaser scene (Cursor: `/new-scene`)
- `integrate/`    — pull designer assets (Cursor: `/integrate`)

Also see `@AGENTS.md` (root) and `.cursor/rules/` for Cursor agent config.
