# Designer task: Character select — Figma carousel (MVP P0)

**Status:** open  
**GitHub:** [assets #15](https://github.com/almost-done-studio/assets/issues/15) (export pack) · [assets #7](https://github.com/almost-done-studio/assets/issues/7) (parent UI)  
**Figma:** [Marginalia Project](https://www.figma.com/design/KWaV7hYij6L49tceSNVe08/Marginalia-Project)  
**Brief (eng):** [figma-marginalia.md](../ui/figma-marginalia.md)  
**For:** assets repo / UI artist  
**Blocks:** [frontend #29](https://github.com/almost-done-studio/frontend/issues/29)  
**Pace:** fits one design session (1–2 h) + one cleanup pass

## Goal

Ship a **dev-ready export pack** so the character select screen can match Figma without the engineer slicing the full mockup by hand.

This replaces the old “list of 5 cards” assumption for `/`. Map cards stay under assets #14.

## Branch

`design/ui-character-select` → PR to `develop` **for this task only**

## Reference

- Figma file (source of truth)
- Mockup PNG: `UI/UI mockups/Character_Selection_Mockup.png`
- Existing cuts: `UI/UI retina/Character Selection Bg Cut/`
- Placeholders already in frontend `public/assets/ui/`: arrows, name-flag, friar-icon, character-selection-bg

## Deliverables

### 1. Export pack (required) — kebab-case filenames

```
ui/character-select/
  ornamental-bg.png          # blue floral upper (or full ornamental layer)
  parchment-bg.png           # cream lower / page
  full-moon.png
  crescent-moon.png
  portrait-frame.png         # gold square frame, transparent center
  portrait-backing.png       # optional red panel if not part of character art
  arrow-left.png
  arrow-right.png
  arrow-left-pressed.png     # optional
  arrow-right-pressed.png    # optional
  name-banner.png            # scroll / name plate, no baked text
  title-bar.png              # optional top bar chrome, no baked text
```

Retina: provide `@2x` or export at 2× logical size (see org CONTRIBUTING).

### 2. Monk portrait for the frame (required for MVP)

```
ui/character-select/portraits/monk.png
```

Square or framed-safe art that reads clearly inside the gold frame at ~phone size.  
Can evolve from `Monk_icon.png` / friar art — must match manuscript style.

### 3. Spec note (required, short)

In the PR description or `ui/character-select/README.md`:

- Logical sizes at **390×844** (and note for **844×390** if landscape frame exists)
- Safe zone for React title text and name text
- Whether confirm is: tap portrait / separate button / swipe-only (recommend: **arrows cycle + primary “Choose” / tap portrait**)
- Cap insets if any 9-slice

### 4. Landscape (P1 — can be second PR)

Same screen at **844×390** without squashing moons or the portrait frame.  
If not ready in week 1, document crop rules for `cover` so Phase 1 can ship portrait-first.

## Naming / hygiene

- Use **kebab-case** paths as above (migrate away from `Crecent_Moon.png`, `UI retina/…` CamelCase when exporting for integrate)
- No embedded game strings in PNG
- Transparent centers where React/Phaser will draw content

## Acceptance criteria

- [ ] All required PNGs in `ui/character-select/` (or agreed path) on a PR to `develop`
- [ ] Monk portrait readable in the gold frame
- [ ] Arrows and name banner usable as separate layers (not only flattened mockup)
- [ ] Figma link + this brief referenced in the PR
- [ ] Engineer can integrate without re-cropping the full mockup

## Out of scope

- Map screen chrome (#12 / #14)
- HUD bar (#13)
- Walk sprites (Monk walk issues #5/#6)
- Non-Monk portraits (stubs OK in code until art exists)

## Engineering follow-up

- Rebuild `CharacterSelectScreen` as carousel
- Register files in `src/constants/ASSETS.ts`
- Keep dynamic title + name in React  
