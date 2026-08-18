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

## Docs

- [`docs/MVP.md`](./docs/MVP.md) — MVP scope (2–4 h/week web slice)
- [`docs/ui/figma-marginalia.md`](./docs/ui/figma-marginalia.md) — [Figma UI](https://www.figma.com/design/KWaV7hYij6L49tceSNVe08/Marginalia-Project)
- [`docs/designer-tasks/`](./docs/designer-tasks/) — briefs for the assets repo

## Deploy (Vercel)

Production and preview deploys come from the Vercel ↔ GitHub integration.

| Branch | Deploy |
|--------|--------|
| `main` | Production |
| `develop` / PRs | Preview |

Config: `vercel.json` (`npm run build` → `dist/`, SPA rewrites).

Env vars (Vercel project → Settings → Environment Variables) must mirror `.env.example` (`VITE_API_URL`, etc.).

### First-time connect (one-off)

1. https://vercel.com/new — Import `almost-done-studio/frontend`
2. Framework Preset: Vite (or leave auto)
3. Root Directory: `.`
4. Set Production Branch to `main` (Previews from other branches/PRs)
5. Add env from `.env.example`, Deploy

Or CLI (Node 20+):

```bash
npx vercel link
npx vercel --prod
```
