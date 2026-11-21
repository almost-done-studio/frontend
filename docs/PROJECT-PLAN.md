# Project plan — AlmostDoneStudio MVP

Companion to [`MVP.md`](./MVP.md). GitHub Issues remain the live status board; this file explains structure, sequence, and ownership.

## Project structure

| Repo | Role in MVP |
|------|-------------|
| [`frontend`](https://github.com/almost-done-studio/frontend) | React UI + Phaser world; Vercel deploy |
| [`assets`](https://github.com/almost-done-studio/assets) | Art / UI exports; design PRs |
| [`backend`](https://github.com/almost-done-studio/backend) | **Out of MVP** |
| [`.github`](https://github.com/almost-done-studio/.github) | Org profile / README |

Branch habits:

- **frontend:** feature branches → `develop` → `main` (production)
- **assets:** design work → `Develop` (working) → promote carefully; avoid dumping drafts straight to `main` without review

## Stages to MVP

```text
Stage A  Finish playable loop gap     → interaction (#31)
Stage B  Persistence + loading harden → localStorage (#4), loading issue
Stage C  Design P0 export             → assets #15 (parallel with A/B)
Stage D  Mobile QA                    → frontend #6
Stage E  Optional world BG polish     → assets #12 (Scriptorium pair)
Stage F  Smoke + release              → smoke checklist issue
```

Do not start Post-MVP art tracks (#6/#8/#13/#14) until Stage F is done unless the team explicitly reprioritizes.

## Tasks by priority

### P0

| Task | Owner | Repo | Depends on |
|------|-------|------|------------|
| [frontend #31](https://github.com/almost-done-studio/frontend/issues/31) One interaction + EventBus UI | KaterinaKachann | frontend | Touch + HUD (done) |
| [frontend #6](https://github.com/almost-done-studio/frontend/issues/6) Mobile QA both orientations | KaterinaKachann | frontend | Prefer after #31 for full path |
| [assets #15](https://github.com/almost-done-studio/assets/issues/15) Character Select Figma export pack | sukharrr | assets | Figma + carousel brief |

### P1

| Task | Owner | Repo | Depends on |
|------|-------|------|------------|
| [frontend #4](https://github.com/almost-done-studio/frontend/issues/4) localStorage save/restore | KaterinaKachann | frontend | Selection flow (done) |
| [frontend #66](https://github.com/almost-done-studio/frontend/issues/66) Loading screen completion | KaterinaKachann | frontend | Partial overlay already in code |
| [frontend #67](https://github.com/almost-done-studio/frontend/issues/67) Smoke test + release checklist | KaterinaKachann | frontend | #31, #4, #66 usable, #6 |
| [assets #12](https://github.com/almost-done-studio/assets/issues/12) Scriptorium portrait + landscape BG | sukharrr | assets | After #15 preferred |

### Post-MVP

| Task | Owner | Repo |
|------|-------|------|
| [assets #6](https://github.com/almost-done-studio/assets/issues/6) Monk Up/Down walk | sukharrr | assets |
| [assets #8](https://github.com/almost-done-studio/assets/issues/8) Creature_1 idle/walk | sukharrr | assets |
| [assets #13](https://github.com/almost-done-studio/assets/issues/13) HUD illustrated chrome | sukharrr | assets |
| [assets #14](https://github.com/almost-done-studio/assets/issues/14) Map location card chrome | sukharrr | assets |

## Dependency graph (simplified)

```text
[done] carousel / map / walk / CSS HUD
        ├─► #31 interact (P0) ──────────────┐
        ├─► #4 localStorage (P1) ───────────┤
        ├─► #66 loading harden (P1) ────────┼─► #67 smoke (P1) ─► MVP release
        └─► #6 mobile QA (P0) ──────────────┘
assets #15 export pack (P0) ──► optional integrate polish
assets #12 Scriptorium BG (P1) ─► optional world art swap
```

## Owners

| Person | Focus |
|--------|-------|
| **KaterinaKachann** | Frontend implementation, mobile QA, smoke / release |
| **sukharrr** | Design exports and art issues only (not frontend coding / QA) |

## Definition of Done (per issue)

An issue is Done only when:

1. Scope in the issue body is delivered.
2. Acceptance criteria are checked off with evidence (PR link, screenshots, QA notes).
3. Out-of-scope items were not silently expanded.
4. For design: files follow the brief’s folder/naming rules and a PR is linked.
5. For code: `lint` / `test` / `build` pass; PR targets `develop`.

## Release readiness

MVP may ship when:

- [ ] Journey Character Select → Map → World → Interact → Map works on phone.
- [ ] localStorage restore verified after reload.
- [ ] Loading never traps the user indefinitely.
- [ ] Portrait + landscape verified ([#6](https://github.com/almost-done-studio/frontend/issues/6)).
- [ ] No open **P0** issues.
- [ ] Smoke checklist issue completed.
- [ ] Non-blocking known issues listed on the smoke issue.

## Status discipline

- Update the **GitHub Issue** when work starts, blocks, or finishes.
- Telegram: short notes + links to Issues/PRs only — no parallel status board.
