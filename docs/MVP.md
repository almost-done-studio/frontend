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

| Area | Status |
|------|--------|
| Milestone 1 — Foundation (routing, CI, Vercel, placeholders) | Done (close leftover issues) |
| Figma character-select UI in code | Not started (code is still a card list) |
| Monk idle/walk from `assets/` in Phaser | Not started |
| Touch move in `WorldScene` | Not started |
| localStorage | Not started |
| One interactable + one world BG | Not started |
| Backend / Capacitor | Deferred |

## UX decision (important)

Figma character select is a **carousel** (portrait + L/R arrows + name banner), not a vertical list of five cards.

- **MVP follows Figma** for `/` (character select).
- Current React list cards are a temporary scaffold.
- Assets issues that assume “5 list cards” (#14) apply to **map cards** and/or post-MVP variants — see [`designer-tasks/character-select-carousel.md`](./designer-tasks/character-select-carousel.md).

## Phases (calendar ≈ months at 2–4 h/week)

### Phase 0 — Close foundation (1–2 weeks)

- [ ] Merge `feature/placeholder-screens` → `develop`; close frontend #5 / #6 if acceptance met
- [ ] Document Figma link in repo (this folder + assets mockups)
- [ ] Triage: update assets #7 to carousel/Figma scope

### Phase 1 — Figma UI + walking Monk (3–5 weeks) ← first “something ready”

| Track | Work |
|-------|------|
| Design | Export carousel chrome from Figma (frame, arrows, name plate, layered BG pieces); portrait for Monk |
| Dev | Rebuild `/` as carousel per Figma; wire exported PNG via `ASSETS.ts` |
| Dev | Integrate Monk idle + walk animations in `WorldScene` |
| Dev | Touch movement (frontend #7) |
| Dev | localStorage character + location (frontend #4) |

**Exit:** phone can select Monk in Figma-like UI and walk on a placeholder world BG.

### Phase 2 — Playable slice (4–6 weeks)

| Track | Work |
|-------|------|
| Design | One full-bleed world BG (portrait + landscape) — slim cut of assets #12 |
| Design | Optional: Creature_1 idle in scene, or map location thumbs |
| Dev | Walk bounds / simple collisions |
| Dev | One interact zone + React/HUD feedback via EventBus |
| Dev | Game HUD: location title + back to map (CSS ok until assets #13) |

**Exit:** full loop menu → map → walk → interact → back to map.

### Phase 3 — Ship MVP (2–3 weeks)

- [ ] Hide or stub non-Monk characters until art exists
- [ ] One playable location; others reuse BG or “soon”
- [ ] Manual smoke checklist (portrait/landscape, iOS/Android Chrome)
- [ ] Refresh org README milestone bars
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
| P0 | [#29](https://github.com/almost-done-studio/frontend/issues/29) Figma character-select carousel | Blocked on assets #15 exports (can start layout with placeholders) |
| P0 | [#30](https://github.com/almost-done-studio/frontend/issues/30) Monk sprite integration | |
| P0 | [#7](https://github.com/almost-done-studio/frontend/issues/7) Touch controls | Core gameplay |
| P1 | [#4](https://github.com/almost-done-studio/frontend/issues/4) localStorage | Persistence |
| P1 | [#31](https://github.com/almost-done-studio/frontend/issues/31) Interact zone + EventBus UI | |
| P0 | [#28](https://github.com/almost-done-studio/frontend/issues/28) Docs PR | Merge MVP + Figma docs |

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
