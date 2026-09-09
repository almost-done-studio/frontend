# UI — Figma Marginalia Project

**Source of truth for menu UI:**  
[Figma — Marginalia Project](https://www.figma.com/design/KWaV7hYij6L49tceSNVe08/Marginalia-Project?m=auto&t=sIdF4SwKSgaz2BRR-6)

Local copy of the draft link also lives in the assets repo:  
`assets/UI/UI mockups/Figma Prototype/Figma Draft Link.txt`

Static export of the character-select frame:  
`assets/UI/UI mockups/Character_Selection_Mockup.png`

## What is in the file (as of MVP planning)

Small UI kit focused on the **character select** screen (working title **Marginalia**), medieval manuscript / marginalia look.

### Character select (portrait mockup)

| Element | Role | Notes for code |
|---------|------|----------------|
| Ornamental blue upper field + parchment lower field | Full-bleed backdrop | Prefer layered pieces already cut in `UI retina/Character Selection Bg Cut/` over a single stretched composite when possible |
| Full moon (L) / crescent moon (R) | Corner decoration | Keep circular; do not squash in landscape |
| Gold square portrait frame | Character art slot | Dynamic portrait inside; frame is chrome |
| Red panel behind figure | Portrait backing | Part of art or separate fill — match Figma |
| Gold L/R arrow buttons (teardrop + red gem) | Cycle characters | Tap ≥ 44×44; already have `arrow-left` / `arrow-right` placeholders |
| Top white title bar | Screen title | **Text from React** — do not bake copy into PNG |
| Bottom parchment name banner (scroll / name-flag) | Character name | **Text from React**; evolve `name-flag.png` |
| Confirm / continue | Implicit: tap portrait or add CTA | Spec in designer task — must be touch-clear |

### Layered BG pieces already in assets

Under `assets/UI/UI retina/Character Selection Bg Cut/`:

- `Ornamental_bg.png`
- `Parchment_bg_plain.png`
- `Full_Moon.png`
- `Crecent_Moon.png` (filename typo — keep until renamed to kebab-case on integrate)

Plus root UI: `Bg_390x844.png`, `Monk_icon.png`, `Name_flag.png`, `Arrow_left.png`, `Arrow_right.png`.

## Gap vs current frontend

| Figma | Current `CharacterSelectScreen` |
|-------|----------------------------------|
| Centered carousel + arrows | Vertical list of 5 cards |
| Illustrated manuscript chrome | CSS cards + full-bleed placeholder BG |
| Name banner under portrait | Name plate inside each list card |

**MVP:** implement the Figma carousel. Keep list-card CSS only until the new screen lands.

## Screens not yet in Figma (or incomplete)

Treat as **follow-ups** — do not block Phase 1:

- Map (`/map`) — still uses list/grid cards + placeholder BG
- Game HUD (`/game`) — CSS placeholder until assets #13
- Loading bar art exists under `UI retina/Loading Screen/` — optional polish

When new frames appear in Figma, add a subsection here and open a designer brief under `docs/designer-tasks/`.

## Engineering constraints (always)

- Touch only; no hover-only affordances  
- Tap targets ≥ 44×44 px  
- Dynamic strings in React (title, name, blurb)  
- React ↔ Phaser only via EventBus  
- Base layout 390×844; landscape 844×390 must not distort moons/frames  

## Related docs

- [MVP.md](../MVP.md) — scope and phases  
- [character-select-carousel.md](../designer-tasks/character-select-carousel.md) — designer deliverables  
- [landscape-full-bleed-backgrounds.md](../designer-tasks/landscape-full-bleed-backgrounds.md) — assets #12  
- [hud-chrome.md](../designer-tasks/hud-chrome.md) — assets #13  
- [card-chrome.md](../designer-tasks/card-chrome.md) — assets #14 (map / post-MVP; not Figma carousel)  
