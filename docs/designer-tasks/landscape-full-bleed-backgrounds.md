# Designer task: full-bleed screen backgrounds (landscape + portrait)

**Status:** open  
**GitHub:** [assets #12](https://github.com/almost-done-studio/assets/issues/12)  
**For:** assets repo / UI artist  
**Blocks:** polished UI on wide phones and landscape orientation

## Branch

`design/characters-creature-1` → PR to `develop` **for this task only**

## Screens in scope

| Screen            | Route   | Frontend component        | Current placeholder              |
|-------------------|---------|---------------------------|----------------------------------|
| Character select  | `/`     | `CharacterSelectScreen`   | `ui/character-selection-bg.png`  |
| Map               | `/map`  | `MapScreen`               | `ui/map-placeholder-bg.png`      |
| Game world        | `/game` | `WorldScene` (Phaser)     | reuses placeholders above        |

All three screens must fill the viewport edge-to-edge in **portrait (390×844)** and **landscape (844×390)** without black bars or distorted circles.

## Problem

Placeholder backgrounds were composed for a fixed landscape frame with a centered oval vignette, moon/sun medallions, and decorative borders.

When the canvas or React backdrop fills the device viewport:

- **Stretching** removes pillarboxing but **distorts circles** (moons, oval frame) on non-matching aspect ratios.
- **Cover scaling** (crop, no distortion) still crops decorative edges on very wide screens.

React screens use `background-size: cover`; the game scene currently **stretches** the texture. Both are acceptable for placeholders only.

## Shared specs

### Target sizes (each screen, each orientation)

1. **Portrait** — 390×844 px (base mobile, iPhone 14 logical)
2. **Landscape** — 844×390 px (rotated phone; full width, no side bars)

Optional: **@2x** exports (780×1688 / 1688×780) for sharp devices.

### Art direction (unchanged)

- Medieval manuscript / marginalia aesthetic
- Blue floral border may extend to edges; **do not rely on a single centered oval** that breaks when cropped
- Keep **moon/sun medallions** circular — place in corners with margin, or use repeatable side pattern
- PNG, sRGB; **no embedded UI text** (React HUD renders titles and labels)
- Dark gradient overlay (~70–90% opacity) is applied in code — artwork can stay bright; contrast must remain readable under overlay

---

## Deliverables

### 1. Character select (start screen)

**Route:** `/` · **Title in UI:** “Choose your figure”

Full-bleed backdrop behind a scrollable list of 5 character cards (portraits + name flags).

**Safe zones**

- **Top ~100 px** — page title + subtitle
- **Center ~60%** — character card list (cards have their own semi-opaque panels; background detail here is partially obscured)
- **Edges** — decorative border / marginalia; must survive `cover` crop in both orientations

**Suggested files**

```
ui/start/character-select-portrait.png
ui/start/character-select-landscape.png
```

**Reference:** current `ui/character-selection-bg.png` (1688×780)

---

### 2. Map screen

**Route:** `/map` · **Title in UI:** “Choose a leaf”

Full-bleed backdrop behind location picker (3 destinations). Landscape layout: 3 cards in a row.

**Safe zones**

- **Top ~88 px** — back button (top-left), title, “Traveling as …” subtitle
- **Center / lower ~55%** — location cards (Scriptorium, Forest Margin, Cloister Walk); cards have semi-opaque panels
- **Edges** — map parchment / folio border; should read as a manuscript map, not a game arena

**Suggested files**

```
ui/map/map-portrait.png
ui/map/map-landscape.png
```

**Reference:** current `ui/map-placeholder-bg.png`

---

### 3. Game world (per location)

**Route:** `/game` · Phaser `WorldScene`

| Location ID   | Display name   | Notes                                      |
|---------------|----------------|--------------------------------------------|
| `scriptorium` | Scriptorium    | Warm lamps, manuscript desk, monk zone     |
| `forest`      | Forest Margin  | Trees, marginalia creatures                |
| `cloister`    | Cloister Walk  | Arcades, stone, candlelight                |

**Safe zones**

- **Top ~72 px** — React HUD (location name, character, back to map)
- **Center-bottom ~40%** — character sprite (monk idle ~193×590)
- **Bottom ~48 px** — safe area / home indicator

**Suggested files**

```
ui/world/scriptorium-portrait.png
ui/world/scriptorium-landscape.png
ui/world/forest-portrait.png
ui/world/forest-landscape.png
ui/world/cloister-portrait.png
ui/world/cloister-landscape.png
```

---

## Acceptance criteria

- [ ] No visible black bars at 390×844 portrait and 844×390 landscape on `/`, `/map`, and `/game`
- [ ] Circles and frames stay round (no horizontal squash)
- [ ] Character select: 5 cards readable over backdrop in portrait and landscape
- [ ] Map: 3 location cards readable; back button area not cluttered
- [ ] Game: character reads clearly on bottom center for each location
- [ ] Palette consistent across start, map, and world screens

## Engineering follow-up (after assets land)

- Wire orientation-specific paths in `src/constants/ASSETS.ts`
- Character select + map: swap CSS backdrop URLs; keep `cover` once aspect ratios match
- `WorldScene`: switch from stretch to **cover** scaling once aspect ratios match target viewports
- Remove duplicate in-scene title text in Phaser (already hidden; HUD-only)

## Reference

- Character select placeholder: `public/assets/ui/character-selection-bg.png`
- Map placeholder: `public/assets/ui/map-placeholder-bg.png`
- Frontend issue context: placeholder screens (#5), PR #20
