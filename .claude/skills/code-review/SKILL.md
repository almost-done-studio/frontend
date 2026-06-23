---
name: code-review
description: Pre-PR checklist for AlmostDoneStudio frontend. Apply before creating a pull request or when reviewing code.
---

# Code Review — AlmostDoneStudio Frontend

## Run first (must all pass)
```bash
npm run lint 2>&1
npm run test 2>&1
npm run build 2>&1
```

## TypeScript
- [ ] No `any` — `grep -r ": any" src/` returns empty
- [ ] All component props typed via named interfaces
- [ ] No implicit returns in async functions

## React
- [ ] Functional components only
- [ ] No inline styles
- [ ] No Phaser imports inside React files
- [ ] useEffect returns cleanup where needed

## Phaser
- [ ] No object creation in `update()` — only method calls
- [ ] All assets loaded in `preload()` not `create()`
- [ ] No React imports inside Phaser scenes
- [ ] EventBus used for React↔Phaser — no direct refs

## Mobile
- [ ] Tappable elements ≥ 44×44px
- [ ] No hover states, keyboard, or mouse events
- [ ] Tested at 390×844 viewport
- [ ] Touch events: `pointermove`, `pointerdown`, `pointerup`

## Architecture
- [ ] No hardcoded values — constants in `src/constants/`
- [ ] New scenes registered in `SCENES` constant
- [ ] API calls only in `src/api/`

## Git
- [ ] Branch: `feature/xxx`, `fix/xxx`, or `setup/xxx`
- [ ] Commits follow format: `type: description [scope]`
- [ ] No `.env`, `node_modules`, `audit.log` in diff
- [ ] PR targets `develop` not `main`
