---
name: capacitor
description: Capacitor Android/iOS native build patterns. Apply when adding native shells, syncing web build to platforms, or debugging device builds.
---

# Capacitor — Native Shell (Android / iOS)

> Use only when the web game builds cleanly (`npm run build`) and you are ready for device/native targets. Do not add Capacitor during early Phaser/React scaffolding.

## Prerequisites
```bash
npm run lint && npm run test -- --run && npm run build
```
All must pass before `npx cap add`.

## One-time init
```bash
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor/ios
npx cap init "AlmostDoneGame" "com.almostdonestudio.game" --web-dir dist
npx cap add android
npx cap add ios
```

Put `appId` / `appName` in `capacitor.config.ts` (not in `.env` — those are Vite-only).

## Sync loop (every web change)
```bash
npm run build
npx cap sync
npx cap open android   # or: npx cap open ios
```

`webDir` must be `dist` (Vite output). Never point Capacitor at `src/` or `public/`.

## Architecture (unchanged)
- React = UI only; Phaser = game world only
- EventBus only — Capacitor plugins do not bridge React↔Phaser
- Touch only — no keyboard shortcuts for gameplay
- Base resolution remains 390×844 with `Phaser.Scale.FIT`

## Safe areas & mobile chrome
- Account for notch / home indicator via CSS `env(safe-area-inset-*)` on React HUD
- Keep Phaser canvas full-bleed; do not letterbox twice (CSS + Phaser)
- Tappable targets still ≥ 44×44px

## Config checklist
- [ ] `capacitor.config.ts` — `appId`, `appName`, `webDir: 'dist'`
- [ ] `.gitignore` includes `android/` / `ios/` local overrides if team agrees; otherwise commit platform projects
- [ ] No secrets in `capacitor.config.*` — use `.env` + Vite `import.meta.env`
- [ ] `VITE_API_URL` works on device (not `localhost` — use LAN IP or staging URL)

## Never
- Import `@capacitor/*` inside Phaser scenes for game logic
- Call `npx cap sync` without a fresh `npm run build`
- Commit signing keystores, provisioning profiles, or `.env`
- Assume mouse/hover — always verify on a real device or emulator with touch

## When stuck
1. Confirm `dist/index.html` loads in browser after `npm run build`
2. `npx cap doctor`
3. Rebuild native project after dependency changes (`npx cap sync`)
