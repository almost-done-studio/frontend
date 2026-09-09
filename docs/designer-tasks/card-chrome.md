# Designer task: Card UI chrome — Character select + Map

**Status:** open (MVP: **map cards only**; character select follows Figma carousel)  
**GitHub:** [assets #14](https://github.com/almost-done-studio/assets/issues/14)  
**For:** assets repo / UI artist  
**Related:** [assets #12](https://github.com/almost-done-studio/assets/issues/12) (backgrounds), [assets #13](https://github.com/almost-done-studio/assets/issues/13) (HUD), [character-select-carousel.md](./character-select-carousel.md), [figma-marginalia.md](../ui/figma-marginalia.md)  
**Blocks:** polished list cards on `/map` (and post-MVP list variants)

> **MVP note:** Character select UI source of truth is the [Figma Marginalia Project](https://www.figma.com/design/KWaV7hYij6L49tceSNVe08/Marginalia-Project) **carousel**, not the five-card list described below. Prioritize [character-select-carousel.md](./character-select-carousel.md). Keep this brief for **map location cards** and any future list layouts.

## Branch

`design/card-chrome` → PR to `develop` **for this task only**

## What is card chrome?

**Card chrome** — visual styling of tappable list cards: frame, panel background, pressed state, slots for portrait/illustration and text. Part of **UI chrome** (like HUD in #13), but for content cards rather than the top bar.

Style: **flat fantasy UI** in the medieval manuscript spirit — consistent with HUD (#13) and full-bleed backgrounds (#12).

## Screens in scope

| Screen            | Route   | Cards                         | Layout                                      |
|-------------------|---------|-------------------------------|---------------------------------------------|
| Character select  | `/`     | 5 character cards             | Portrait: column · Landscape: 2-column grid |
| Map               | `/map`  | 3 location cards              | Portrait: column · Landscape: 3-column grid |

Cards are `<button>` elements: tap selects a character or location. No hover states.

## Current implementation (placeholder)

Panels use **CSS gradients**, without separate card assets:

- Border `1px` `#3d2e1f`, no rounded corners
- Background gradient `#2a1f14` → `#1a120b` (~90–96% opacity)
- `:active` — border `#c4a35a`, slightly darker background
- Min height: character **72px** (landscape 64px), location **88px** (landscape 120px column)
- **name-flag.png** — draft only, used for name plate on character cards and thumbnail slot on map cards

Reference: `CharacterSelectScreen.module.css`, `MapScreen.module.css`, `public/assets/ui/name-flag.png`.

### Character card anatomy

```
┌─────────────────────────────────────┐
│ [portrait 56×56]  [name-flag + name]│
│                    blurb text       │
└─────────────────────────────────────┘
```

- Portrait slot: icon or colored swatch (4 characters without art yet)
- Name plate: `name-flag.png` background + Orotund title
- Blurb: Modern Antiqua secondary text

### Map location card anatomy

```
┌─────────────────────────────────────┐
│ [thumb 72×72]   location name       │
│                 blurb text          │
└─────────────────────────────────────┘
```

Landscape: card becomes a column — thumb full width, **48px** height.

## Deliverables

### 1. Card style guide (required)

Figma / PDF:

- **Character card** — default, pressed/active; portrait + landscape sizes
- **Location card** — default, pressed/active; portrait + landscape (column) layout
- **Name plate** — replacement/evolution of `name-flag.png` (default + pressed)
- **Thumbnail frame** — slot for location art (72×72 portrait, full-width strip landscape)
- **Typography** — name (display), blurb (body); sizes for both orientations
- **Color tokens** — card bg, border, active border, text; consistent with #13
- **Spacing** — padding, gap portrait/thumb ↔ text, min tap height ≥ 44px

### 2. PNG assets (required or 9-slice)

```
ui/cards/character-card-default.png
ui/cards/character-card-pressed.png
ui/cards/location-card-default.png
ui/cards/location-card-pressed.png
ui/cards/name-plate-default.png
ui/cards/name-plate-pressed.png
ui/cards/thumbnail-frame.png          # optional mask/frame for map art slot
```

If using **9-slice** — include cap insets and preview at min/max card width.

`name-flag.png` can be deprecated after the final name plate ships.

### 3. Mockups (required)

High-fidelity over backgrounds from #12:

- [ ] Character select — 5 cards, portrait 390×844
- [ ] Character select — 5 cards, landscape 844×390
- [ ] Map — 3 location cards, portrait + landscape

Show pressed state on at least one card in each mockup.

## Design constraints

- **Touch-only** — default + `:active`/pressed only; no hover
- **Whole card is tappable** — decoration must not interfere with hit area
- **Readable over #12 backgrounds** — cards semi-transparent or opaque; text must contrast
- **Consistent with #13** — border, gold accent, fonts match HUD
- **No embedded dynamic text in PNG** — names and blurbs rendered by React
- **Portrait/thumb slots** — fixed sizes or clear safe zones for future illustrations (separate tasks)

## Acceptance criteria

- [ ] Character and location cards look like one UI system
- [ ] Pressed state is obvious without hover
- [ ] Name plate readable for names up to ~20 characters
- [ ] Map thumbnail slot ready for location art (not just name-flag placeholder)
- [ ] Mockups in portrait and landscape without safe-area clipping
- [ ] Style guide provides tokens for `THEME.ts` / CSS modules

## Out of scope (separate tasks)

- Character portraits (5) — separate task
- Location thumbnail illustrations (3) — separate task
- Full-bleed backgrounds — #12
- Top bar HUD — #13

## Engineering follow-up (after design lands)

- Update `CharacterSelectScreen.module.css`, `MapScreen.module.css`
- Replace `name-flag.png` in `src/constants/ASSETS.ts`
- Wire 9-slice / background-image assets if needed
- Verify landscape grid layouts after card height changes

## Reference

- Character cards: `src/components/CharacterSelectScreen.tsx` + `.module.css`
- Location cards: `src/components/MapScreen.tsx` + `.module.css`
- Placeholder name plate: `public/assets/ui/name-flag.png`
- Theme: `src/constants/THEME.ts`, `src/styles/theme.css`
- HUD task: [assets #13](https://github.com/almost-done-studio/assets/issues/13)
- Backgrounds task: [assets #12](https://github.com/almost-done-studio/assets/issues/12)
