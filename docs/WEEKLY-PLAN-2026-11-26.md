# Weekly plan — 2026-11-26 (Wed) → 2026-12-03 (Wed)

Filled from the MVP reset. Copy pattern: [`WEEKLY-PLAN-TEMPLATE.md`](./WEEKLY-PLAN-TEMPLATE.md).

## Weekly Plan

**Main goal of the week:** Close the playable-loop gap (one interaction) and ship the designer P0 export pack; start persistence / loading harden in parallel if capacity allows.

| Planned task | Owner | Expected deliverable | Dependencies / blockers | GitHub |
|--------------|-------|----------------------|-------------------------|--------|
| One WorldScene interaction + EventBus UI feedback | KaterinaKachann | Interact zone + React feedback on `develop` | None (walk/HUD done) | [frontend #31](https://github.com/almost-done-studio/frontend/issues/31) |
| Character Select Figma carousel export pack | sukharrr | kebab-case export PR to assets `Develop` | Figma + carousel brief | [assets #15](https://github.com/almost-done-studio/assets/issues/15) |
| localStorage save/restore (start) | KaterinaKachann | Save character + location; safe empty/corrupt handling | Selection flow done | [frontend #4](https://github.com/almost-done-studio/frontend/issues/4) |
| Loading error path (if time) | KaterinaKachann | No infinite spinner on load failure | Overlay already partial | [frontend #66](https://github.com/almost-done-studio/frontend/issues/66) |

**Explicitly not this week:** assets #6/#8/#13/#14 (Post-MVP), merging assets PR #22 without review, expanding dialog system.

## Weekly Review

_(fill at end of week)_

### Completed
-

### In progress
-

### Not completed
-

### Blockers
-

### Decisions made
-

### Next week’s priorities
1. Mobile QA [#6](https://github.com/almost-done-studio/frontend/issues/6)
2. Scriptorium BG [#12](https://github.com/almost-done-studio/assets/issues/12) if #15 done
3. Smoke [#67](https://github.com/almost-done-studio/frontend/issues/67) when P0 loop + persistence land
