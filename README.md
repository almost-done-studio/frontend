# AlmostDoneStudio — Frontend

Mobile top-down game with medieval manuscript / marginalia aesthetic.
Player picks a character, explores a map, interacts with the world.

## Stack

- **React** — UI layer (menus, HUD, screens)
- **Phaser 3** — game world (movement, sprites, collisions, tilemap)
- **TypeScript** — strict, no `any`
- **Vite** — dev server and build
- **Zustand** — global state
- **Capacitor** — Android/iOS target

## Target

- Resolution: 390×844 (iPhone 14)
- Input: touch only — no keyboard, no mouse
- Platform: mobile browser → Capacitor

## Quick Start

```bash
npm install
npm run dev
```

## Commands

```bash
npm run dev      # local dev server
npm run build    # production build → dist/
npm run lint     # eslint
npm run test     # vitest
npm run preview  # preview production build
```

## Architecture

React and Phaser never import each other. Communication goes through EventBus only.

```
React UI  ←──EventBus──→  Phaser Game
```

See `CLAUDE.md` for full rules and agent configuration.
