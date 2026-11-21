# Designer task: Scriptorium world backgrounds (portrait + landscape)

**Status:** open — **MVP P1** (narrowed 2026-11-22)  
**GitHub:** [assets #12](https://github.com/almost-done-studio/assets/issues/12)  
**For:** `sukharrr` / assets repo  
**Blocks:** polished Scriptorium presentation on wide phones and landscape; **does not** block coding the interact zone

> **MVP cut:** only **Scriptorium** Game World backgrounds (portrait + landscape).  
> Character Select / Map full-bleed redesigns and Forest / Cloister world art are **out of this issue** (schedule separately after MVP if still needed).

## Branch

`design/scriptorium-world-bg` → PR to assets `Develop` **for this task only**

## In scope

| Screen | Route | Frontend | Deliverable |
|--------|-------|----------|-------------|
| Game world — Scriptorium | `/game` | `WorldScene` | Portrait + landscape BG pair |

## Shared specs (from existing docs — do not invent new sizes)

### Target sizes

1. **Portrait** — 390×844 px (base mobile, iPhone 14 logical)
2. **Landscape** — 844×390 px

Optional: **@2x** exports (780×1688 / 1688×780).

### Art direction

- Medieval manuscript / marginalia aesthetic
- Avoid relying on a single centered oval that breaks when cropped
- Keep circular medallions round — corners with margin, or repeatable side pattern
- PNG, sRGB; **no embedded UI text** (React HUD renders titles)
- Dark gradient overlay (~70–90% opacity) is applied in code — artwork can stay bright; contrast must remain readable under overlay

### Safe zones (Game World)

- **Top ~72 px** — React HUD (location name, back to map)
- **Center-bottom ~40%** — character sprite (monk idle footprint)
- **Bottom ~48 px** — safe area / home indicator

## Deliverables

```
ui/world/scriptorium-portrait.png
ui/world/scriptorium-landscape.png
```

## Acceptance criteria

- [ ] Portrait and landscape Scriptorium BGs delivered
- [ ] Circles / key shapes stay round (no horizontal squash) at the sizes above
- [ ] Monk reads clearly on the lower center over the art
- [ ] No baked HUD strings
- [ ] PR links assets #12 and this brief

## Out of scope

- Character select / Map backdrop pairs
- Forest / Cloister world BGs
- HUD chrome ([assets #13](https://github.com/almost-done-studio/assets/issues/13) — Post-MVP)
- Map card chrome ([assets #14](https://github.com/almost-done-studio/assets/issues/14) — Post-MVP)

## Engineering follow-up (after assets land)

- Register orientation-specific paths in `src/constants/ASSETS.ts`
- Prefer **cover** scaling in `WorldScene` once aspect ratios match

## Reference

- Current world / chunk placeholders in frontend `public/assets/`
- Figma Marginalia for overall language (menus); world BG is location art, not the carousel frame
