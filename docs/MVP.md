# MVP — Marginalia (AlmostDoneStudio)

Pace: **2–4 hours/week** (dev + design, often in parallel).  
Target: a **touch-playable web vertical slice** on Vercel. Backend and Capacitor are **out of MVP**.

## Source of truth

| Layer | Source |
|-------|--------|
| Product loop | This file |
| UI look (menus) | [Figma — Marginalia Project](https://www.figma.com/design/KWaV7hYij6L49tceSNVe08/Marginalia-Project) · brief [`ui/figma-marginalia.md`](./ui/figma-marginalia.md) |
| Engineering rules | `CLAUDE.md` / `AGENTS.md` |
| Designer briefs | [`designer-tasks/`](./designer-tasks/) |

Working title in org docs may still say `[Название игры]` — UI brand in Figma is **Marginalia**.

## MVP definition (done when…)

Player on a phone browser can:

1. Open the character select screen that matches the Figma carousel layout (Monk ready; others can be stubs).
2. Pick a location on the map and enter the Phaser world.
3. **Move** the Monk with touch (tap-to-move or equivalent — no WASD).
4. Trigger **one** interaction (zone / NPC / object) with UI feedback via EventBus.
5. Have last character + location restored from **localStorage**.
6. Use a stable **Vercel** deploy (`main` / preview).

Not required for MVP: 5 fully illustrated heroes, 3 unique tilemaps, Express/Postgres, Capacitor, store builds.

## Status snapshot

_Updated 2026-09-09 — reflects `feature/placeholder-screens` (merge into `develop` in progress)._

| Area | Status |
|------|--------|
| Milestone 1 — Foundation (routing, CI, Vercel, placeholders) | Done |
| Main menu + settings + screen flow | Done |
| Figma character-select carousel in code | Done (Monk portrait; others stubbed) |
| Map select + enter Phaser world | Done (chunk map BGs ×3) |
| Touch move in `WorldScene` (tap-to-walk) | Done |
| Walk bounds (trapezoid) | Done |
| Game HUD (location title + back to map) | Done (CSS) |
| Monk idle/walk animations from `assets/` | Not started (static `friar-idle` placeholder) |
| localStorage character + location | Not started |
| One interactable + EventBus UI feedback | Not started |
| Backend / Capacitor | Deferred |

## UX decision (important)

Figma character select is a **carousel** (portrait + L/R arrows + name banner), not a vertical list of five cards.

- **MVP follows Figma** for character select — implemented as carousel (not a card list).
- Assets issues that assume “5 list cards” (#14) apply to **map cards** and/or post-MVP variants — see [`designer-tasks/character-select-carousel.md`](./designer-tasks/character-select-carousel.md).

## Phases (calendar ≈ months at 2–4 h/week)

### Phase 0 — Close foundation (1–2 weeks)

- [ ] Merge `feature/placeholder-screens` → `develop`; close frontend #5 / #6 if acceptance met
- [x] Document Figma link in repo (this folder + assets mockups)
- [ ] Triage: update assets #7 to carousel/Figma scope

### Phase 1 — Figma UI + walking Monk (3–5 weeks) ← largely done on feature branch

| Track | Work | Status |
|-------|------|--------|
| Design | Export carousel chrome from Figma; portrait for Monk | In code via `ASSETS` (polish/exports may remain) |
| Dev | Rebuild character select as carousel per Figma | Done |
| Dev | Integrate Monk idle + walk animations in `WorldScene` | **Todo** |
| Dev | Touch movement (frontend #7) | Done (tap-to-walk + camera follow) |
| Dev | localStorage character + location (frontend #4) | **Todo** |

**Exit:** phone can select Monk in Figma-like UI and walk on a placeholder world BG.  
_(UI + walk: done; swap in real Monk anims + localStorage still open.)_

### Phase 2 — Playable slice (4–6 weeks)

| Track | Work | Status |
|-------|------|--------|
| Design | One full-bleed world BG (portrait + landscape) — slim cut of assets #12 | Partial (chunk BGs in game; design pair may remain) |
| Design | Optional: Creature_1 idle in scene, or map location thumbs | Map thumbs in code; Creature optional |
| Dev | Walk bounds / simple collisions | Done (walk trapezoid) |
| Dev | One interact zone + React/HUD feedback via EventBus | **Todo** |
| Dev | Game HUD: location title + back to map (CSS ok until assets #13) | Done |

**Exit:** full loop menu → map → walk → interact → back to map.  
_(Loop minus interact is playable on the feature branch.)_

### Phase 3 — Ship MVP (2–3 weeks)

- [x] Stub non-Monk characters without art (carousel stubs, null portraits)
- [ ] One playable location; others reuse BG or “soon” (three locations playable with shared chunk pattern — decide ship cut)
- [ ] Manual smoke checklist (portrait/landscape, iOS/Android Chrome)
- [x] Refresh org README milestone bars (2026-09-09)
- [ ] Name freeze: Marginalia (or final title)

### After MVP

Remaining characters & locations, full tilemap, HUD/card polish (#13/#14), Capacitor, backend.

## Issue map

### Designer (`assets`)

| Priority | Issue / brief | Notes |
|----------|---------------|--------|
| P0 | [#15](https://github.com/almost-done-studio/assets/issues/15) + [#7](https://github.com/almost-done-studio/assets/issues/7) · [brief](./designer-tasks/character-select-carousel.md) | Figma export pack |
| P1 | [#12](https://github.com/almost-done-studio/assets/issues/12) (world BG only for MVP) | One location pair first |
| P1 | Monk / Creature [#5](https://github.com/almost-done-studio/assets/issues/5)/[#6](https://github.com/almost-done-studio/assets/issues/6)/[#8](https://github.com/almost-done-studio/assets/issues/8) | As needed for Phase 1–2 |
| P2 | [#13](https://github.com/almost-done-studio/assets/issues/13) HUD, [#14](https://github.com/almost-done-studio/assets/issues/14) cards | After carousel; #14 = map cards |

### Developer (`frontend`)

| Priority | Issue | Notes |
|----------|-------|--------|
| P0 | Close [#5](https://github.com/almost-done-studio/frontend/issues/5) / [#6](https://github.com/almost-done-studio/frontend/issues/6) after placeholder merge | Hygiene |
| P0 | [#30](https://github.com/almost-done-studio/frontend/issues/30) Monk sprite integration | Next gameplay polish — frames exist in `assets/` |
| P1 | [#4](https://github.com/almost-done-studio/frontend/issues/4) localStorage | Persistence |
| P1 | [#31](https://github.com/almost-done-studio/frontend/issues/31) Interact zone + EventBus UI | Remaining Phase 2 gap |
| — | [#29](https://github.com/almost-done-studio/frontend/issues/29) Figma character-select carousel | Done on feature branch — close after merge |
| — | [#7](https://github.com/almost-done-studio/frontend/issues/7) Touch controls | Done (tap-to-walk) — close after merge |
| — | [#28](https://github.com/almost-done-studio/frontend/issues/28) Docs PR | MVP + Figma docs in repo — close when merged |

## Weekly rhythm (suggested)

1. **Design session (1–2 h):** one export set or one BG orientation.  
2. **Dev session (1–2 h):** one PR (`feature/…` → `develop`).  
3. Prefer **vertical slices** over parallel unfinished systems.

## Explicit non-goals (until MVP ships)

- `backend/` Express + PostgreSQL  
- Capacitor native shells  
- axios / `src/api` live calls  
- Five playable illustrated characters  
- Full tilemap for all three locations  
