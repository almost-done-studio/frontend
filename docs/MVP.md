# MVP — Marginalia (AlmostDoneStudio)

Pace: **2–4 hours/week** (dev + design, often in parallel).  
Target: a **touch-playable web vertical slice** on Vercel. Backend and Capacitor are **out of MVP**.

Working week: **Wednesday → Wednesday**. GitHub Issues are the status source of truth; Telegram is for links and short sync only.

## Source of truth

| Layer | Source |
|-------|--------|
| Product loop / MVP definition | This file |
| Execution plan | [`PROJECT-PLAN.md`](./PROJECT-PLAN.md) |
| Design workflow | [`DESIGN-WORKFLOW.md`](./DESIGN-WORKFLOW.md) |
| Weekly ritual | [`WEEKLY-PLAN-TEMPLATE.md`](./WEEKLY-PLAN-TEMPLATE.md) |
| UI look (menus) | [Figma — Marginalia Project](https://www.figma.com/design/KWaV7hYij6L49tceSNVe08/Marginalia-Project) · brief [`ui/figma-marginalia.md`](./ui/figma-marginalia.md) |
| Engineering rules | `CLAUDE.md` / `AGENTS.md` |
| Designer briefs | [`designer-tasks/`](./designer-tasks/) |

Working title in org docs may still vary — UI brand in Figma is **Marginalia**.

## Goal

Ship a phone-browser playable slice of one scenario:

**Character Select → Map → Game World → Interaction → Return to Map**

Do not expand MVP with new mechanics, characters, locations, or elaborate animation packs unless they block this loop.

## Main user journey

1. Open Character Select (Figma carousel; Monk ready, others may stub).
2. Pick a character.
3. Open Map and enter a location (Scriptorium is the primary polish target).
4. Move the Monk with touch in Game World.
5. Trigger **one** interaction zone; see React UI feedback via EventBus.
6. Return to Map.
7. Reload: last character + location restore from localStorage.

## In MVP

| Area | Requirement |
|------|-------------|
| Character Select | Carousel UX; Monk playable |
| Map | Enter Game World from a location |
| Game World | Basic touch movement |
| Interaction | One zone + EventBus → React feedback |
| Loading | Clear feedback while world assets load |
| Persistence | localStorage save/restore of basic state |
| Mobile | Portrait + landscape usable |
| Release | Manual smoke checklist; no open P0 defects |

## Explicitly deferred (Post-MVP)

- Monk Up/Down walk packs ([assets #6](https://github.com/almost-done-studio/assets/issues/6))
- Creature_1 prep ([assets #8](https://github.com/almost-done-studio/assets/issues/8))
- Illustrated HUD chrome ([assets #13](https://github.com/almost-done-studio/assets/issues/13))
- Map location card chrome ([assets #14](https://github.com/almost-done-studio/assets/issues/14))
- Full dialog system / dialog mockup integration
- Forest / Cloister unique world art beyond placeholders
- Five fully illustrated heroes
- Full tilemaps for all locations
- `backend/` Express + PostgreSQL
- Capacitor / store builds
- Live `src/api` calls

## Status snapshot

_Updated 2026-11-22 — audit against local `frontend` + GitHub Issues._

| Area | Status |
|------|--------|
| Foundation (routing, CI, Vercel, placeholders) | Done |
| Main menu + settings + screen flow | Done |
| Figma character-select carousel in code | Done (export pack polish: assets #15) |
| Map select + enter Phaser world | Done |
| Touch move in `WorldScene` | Done |
| Walk bounds | Done |
| Game HUD (CSS title + back) | Done |
| Monk idle/walk (left/right) | Done |
| Loading overlay (progress → EventBus → React) | Partial — [#66](https://github.com/almost-done-studio/frontend/issues/66) |
| localStorage character + location | Not started ([frontend #4](https://github.com/almost-done-studio/frontend/issues/4)) |
| One interactable + EventBus UI feedback | Not started ([frontend #31](https://github.com/almost-done-studio/frontend/issues/31)) |
| Mobile QA both orientations | Open — verify, do not rebuild ([frontend #6](https://github.com/almost-done-studio/frontend/issues/6)) |
| Smoke / release checklist | Open ([frontend #67](https://github.com/almost-done-studio/frontend/issues/67)) |
| Backend / Capacitor | Deferred |

## Definition of Done for MVP release

Player on a phone browser can complete the journey above on a Vercel build, with:

1. No remaining **P0** issues.
2. Loading feedback that does not hang forever on failure.
3. Persistence across reload for character + location.
4. Smoke checklist completed and linked from the smoke issue.
5. Known non-blocking issues documented (not silently ignored).

## Dependencies and blockers

| Blocker | Why it matters | Issue |
|---------|----------------|-------|
| Interaction + EventBus UI | Completes the playable loop | [frontend #31](https://github.com/almost-done-studio/frontend/issues/31) **P0** |
| Mobile verification | Release confidence on real devices | [frontend #6](https://github.com/almost-done-studio/frontend/issues/6) **P0** |
| Character Select export pack | Design P0; carousel already coded — exports reduce engineer slicing | [assets #15](https://github.com/almost-done-studio/assets/issues/15) **P0** |
| localStorage | Required for journey step 7 / smoke | [frontend #4](https://github.com/almost-done-studio/frontend/issues/4) **P1** |
| Loading completion (errors + QA) | Required assets are heavy; infinite spinner is a release risk | [frontend #66](https://github.com/almost-done-studio/frontend/issues/66) **P1** |
| Scriptorium BG pair | Improves world presentation; does not block coding the interact zone | [assets #12](https://github.com/almost-done-studio/assets/issues/12) **P1** |

## Issue map (authoritative on GitHub)

### Designer — `sukharrr` (`assets`)

| Priority | Issue |
|----------|-------|
| P0 | [#15](https://github.com/almost-done-studio/assets/issues/15) Character Select — Figma carousel export pack |
| P1 | [#12](https://github.com/almost-done-studio/assets/issues/12) Scriptorium — world background portrait + landscape |
| Post-MVP | [#6](https://github.com/almost-done-studio/assets/issues/6) Monk Up/Down walk |
| Post-MVP | [#8](https://github.com/almost-done-studio/assets/issues/8) Creature_1 idle/walk |
| Post-MVP | [#13](https://github.com/almost-done-studio/assets/issues/13) HUD illustrated chrome |
| Post-MVP | [#14](https://github.com/almost-done-studio/assets/issues/14) Map location card chrome |

### Developer — `KaterinaKachann` (`frontend`)

| Priority | Issue |
|----------|-------|
| P0 | [#31](https://github.com/almost-done-studio/frontend/issues/31) One WorldScene interaction + EventBus UI |
| P0 | [#6](https://github.com/almost-done-studio/frontend/issues/6) Verify mobile-first UX (QA) |
| P1 | [#4](https://github.com/almost-done-studio/frontend/issues/4) localStorage save/restore |
| P1 | [#66](https://github.com/almost-done-studio/frontend/issues/66) Loading screen completion |
| P1 | [#67](https://github.com/almost-done-studio/frontend/issues/67) Manual smoke test and release checklist |

## Priorities

- **P0** — blocks the main game scenario or MVP release.
- **P1** — needed for a complete MVP, but does not block current development of P0 work.
- **Post-MVP** — after the first playable release.

## Explicit non-goals (until MVP ships)

- Expanding beyond the single interactable loop
- Parallel art tracks that do not feed Character Select exports or Scriptorium BG
- Backend, Capacitor, store pipelines
