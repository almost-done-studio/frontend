# AlmostDoneStudio — Frontend Agent Configuration

Cross-tool standard (Claude Code, Cursor, Codex, Gemini CLI).

## Project
Mobile top-down game, medieval manuscript / marginalia aesthetic.
Stack: React + Phaser + TypeScript + Vite → Capacitor (Android/iOS).
Resolution: 390x844. Touch-only input. No keyboard/mouse assumptions.

## Commands
```bash
npm run dev      # dev server
npm run build    # production build
npm run lint     # eslint
npm run test     # vitest
```

## Architecture
- React = UI layer only (menus, HUD, screens)
- Phaser = game world only (movement, sprites, collisions)
- Communication = EventBus ONLY. Never cross-import.

## Critical Rules
- No `any` in TypeScript
- No object creation in Phaser `update()`
- All assets loaded in Phaser `preload()`
- All constants in `src/constants/`
- Tappable elements ≥ 44×44px
- Branch from `develop`: `feature/xxx` or `fix/xxx`
- Commit: `type: description [scope]`

## Before Every PR
```bash
npm run lint && npm run test && npm run build
```
All must pass. PR targets `develop` not `main`.

## Never
- Commit `.env` or secrets
- Push directly to `main` or `develop`
- Hardcode values outside `src/constants/`
- Import React in Phaser scenes or Phaser in React components
