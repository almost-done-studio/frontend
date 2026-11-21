# Design workflow — AlmostDoneStudio

How design work moves from Figma / art folders into the game without a second status system. Status lives on **GitHub Issues** in [`almost-done-studio/assets`](https://github.com/almost-done-studio/assets).

Related: [`MVP.md`](./MVP.md) · [`PROJECT-PLAN.md`](./PROJECT-PLAN.md) · briefs in [`designer-tasks/`](./designer-tasks/)

## Roles

| Role | GitHub user | Does |
|------|-------------|------|
| Designer | `sukharrr` | Art, exports, mockups on **assets** issues |
| Developer | `KaterinaKachann` | Integrates exports in **frontend**; accepts design handoffs |

Designer is **not** assigned frontend implementation or QA issues.

## How the designer gets work

1. Open **assets** Issues labeled `P0` / `P1` / `Post-MVP`.
2. Read the issue body (Goal / Scope / Out of scope / Acceptance / Deliverables).
3. Open the linked brief under `frontend/docs/designer-tasks/` when present.
4. Work only the **current** priority: MVP P0 first, then P1, then Post-MVP.

Current designer queue (2026-11-22):

1. **Now:** [assets #15](https://github.com/almost-done-studio/assets/issues/15) Character Select Figma carousel export pack (**P0**)
2. **Next:** [assets #12](https://github.com/almost-done-studio/assets/issues/12) Scriptorium world BG portrait + landscape (**P1**)
3. **Later:** [#6](https://github.com/almost-done-studio/assets/issues/6), [#8](https://github.com/almost-done-studio/assets/issues/8), [#13](https://github.com/almost-done-studio/assets/issues/13), [#14](https://github.com/almost-done-studio/assets/issues/14) (**Post-MVP**)

## Agreeing on design decisions

- **Menus / Character Select:** Figma [Marginalia Project](https://www.figma.com/design/KWaV7hYij6L49tceSNVe08/Marginalia-Project) is source of truth ([`ui/figma-marginalia.md`](./ui/figma-marginalia.md)).
- **World / animation packs:** existing folders in the assets repo + the issue brief.
- If Figma and a brief disagree, **comment on the GitHub Issue** before exporting a large pack.
- Do not invent new sizes, formats, or folder schemes when the brief already specifies them.

## Source of truth

| Asset type | Source of truth |
|------------|-----------------|
| Character Select UI | Figma Marginalia + [character-select-carousel.md](./designer-tasks/character-select-carousel.md) |
| Scriptorium world BG | [landscape-full-bleed-backgrounds.md](./designer-tasks/landscape-full-bleed-backgrounds.md) (MVP cut: Scriptorium only) |
| HUD / map card polish | Briefs exist; issues are **Post-MVP** |
| Runtime paths in the game | `frontend` `src/constants/ASSETS.ts` after integrate |

## Export packaging

Follow the active issue + brief:

- Prefer **kebab-case** filenames for new packs.
- No baked dynamic game strings in PNG.
- Transparent centers where React/Phaser draws content.
- Portrait / landscape pairs when the brief asks for both.
- Keep one concern per PR (do not mix Character Select exports with dialog drafts).

## Hand-off to development

1. Branch from the assets design working branch (`Develop`).
2. Open a PR with: What / Why, link to the Issue, Figma link if UI, checklist from the issue.
3. List exact paths added/changed.
4. Mention any known gaps (e.g. landscape deferred).
5. Developer reviews visually + checks paths against the brief.
6. After merge (or agreed integrate), developer wires `ASSETS` / CSS in **frontend** on a separate PR when needed.

Telegram: send the **Issue + PR links**, not a separate task list.

## Review and Done

| Step | Who |
|------|-----|
| Visual / file review on assets PR | Developer (and designer on comments) |
| Runtime integrate | Developer on frontend |
| Mark Issue Done | Only when acceptance criteria are met — usually after usable handoff is accepted |

Do **not** close a design issue because a draft mockup PR exists (e.g. dialog drafts). Drafts that are out of MVP stay open or Post-MVP.

## Branch caution

Assets default branch is `main`, but day-to-day design integration uses **`Develop`**. Prefer PRs into `Develop` unless the team agrees otherwise. Empty or mistaken PRs should be closed with a note and reopened with real files.
