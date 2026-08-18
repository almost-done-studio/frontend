# Designer task: HUD (Heads-Up Display) — flat fantasy UI chrome

**Status:** open  
**GitHub:** [assets #13](https://github.com/almost-done-studio/assets/issues/13)  
**For:** assets repo / UI artist  
**Related:** [assets #12](https://github.com/almost-done-studio/assets/issues/12) (full-bleed backgrounds)  
**Blocks:** consistent overlay UI across all React screens

## Branch

`design/hud-chrome` → PR to `develop` **for this task only**

## What is HUD?

**HUD (Heads-Up Display)** — overlay UI on top of the game field or menu screen: titles, navigation buttons, meta information. Not part of the game world (non-diegetic UI), but **UI chrome** — the framing layer of the interface.

Project style: **flat fantasy HUD** — minimal overlay with a parchment palette and serif/gothic typography. Not skeuomorphic (not a 3D imitation of real objects), but in the spirit of medieval manuscript / marginalia.

## Screens in scope

| Screen            | Route   | HUD elements                                      |
|-------------------|---------|---------------------------------------------------|
| Character select  | `/`     | Page title, subtitle (no back button)             |
| Map               | `/map`  | Back button, title, subtitle                      |
| Game              | `/game` | “Map” back button, location title, character meta |

Brand bar “AlmostDoneStudio” is hidden on `/game` — the game HUD replaces the top bar.

## Current implementation (placeholder)

Everything is built with **CSS + fonts**, without separate HUD assets:

- Flat rectangular buttons, `1px` border, no rounded corners
- Header gradient background: `#2a1f14` → `#1a120b`
- Active state: border `#c4a35a` (gold)
- Fonts: **Orotund Heavy** (display), **Modern Antiqua Book** (body)
- Minimum tap target: **44×44 px**

Reference files: `src/constants/THEME.ts`, `src/styles/theme.css`, `GameScreen.module.css`, `MapScreen.module.css`.

## Deliverables

### 1. HUD style guide (required)

Figma / PDF with specs for:

- **Top bar / HUD bar** — height portrait & landscape, padding, safe-area (notch)
- **Primary button** (Back, Map) — default, pressed/active, disabled
- **Typography** — title (H1), subtitle, button label; sizes portrait & landscape
- **Color tokens** — background, border, text primary/secondary, accent (gold)
- **Spacing** — gap between button and text block

### 2. Optional PNG assets

If **illustrated chrome** is needed instead of pure CSS:

```
ui/hud/hud-bar-portrait.png      # 9-slice or full-width strip
ui/hud/hud-bar-landscape.png
ui/hud/button-default.png
ui/hud/button-pressed.png
ui/hud/button-back-icon.png      # alternative to arrow-left.png
```

If flat CSS is enough — style guide + hex/font specs are sufficient.

### 3. Per-screen mockups (required)

Wireframes or high-fidelity mockups:

- [ ] Character select header (portrait + landscape)
- [ ] Map header with back (portrait + landscape)
- [ ] Game HUD with “Map” button (portrait + landscape)

Mockups at **390×844** and **844×390**, over placeholder backgrounds from #12.

## Design constraints

- **Touch-only** — no hover states; show `:active` / pressed only
- **Tappable ≥ 44×44 px** — all buttons and icons
- **Readable over bright backgrounds** — HUD bar may use semi-transparent or gradient fill
- **Consistent with #12** — palette and fonts match full-bleed backgrounds
- **No embedded game text in PNG** — titles rendered by React (localization)

## Acceptance criteria

- [ ] HUD is readable on all three screens in portrait and landscape
- [ ] Back / Map buttons belong to the same visual family
- [ ] Title handles long location names (ellipsis ok)
- [ ] Safe-area (notch, home indicator) accounted for in mockups
- [ ] Style guide contains all tokens for transfer to `THEME.ts`

## Engineering follow-up (after design lands)

- Update `src/constants/THEME.ts` and CSS modules per style guide
- Wire HUD PNG (if any) via `src/constants/ASSETS.ts`
- Verify landscape media queries on all HUD screens

## Reference

- Game HUD: `src/components/GameScreen.tsx` + `.module.css`
- Map header: `src/components/MapScreen.tsx` + `.module.css`
- Character select header: `src/components/CharacterSelectScreen.tsx` + `.module.css`
- Fonts: `public/assets/fonts/modern-antiqua-book.ttf`, `orotund.ttf`
- Backgrounds task: [assets #12](https://github.com/almost-done-studio/assets/issues/12)
