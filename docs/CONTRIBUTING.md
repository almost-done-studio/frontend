# Contributing

## Branch workflow

```
main        ← production releases only (via PR from develop)
develop     ← integration branch (via PR from feature/fix/setup branches)
feature/xxx ← new functionality
fix/xxx     ← bug fixes
setup/xxx   ← tooling, config, CI
```

Always branch from `develop`. PR targets `develop`. Never push directly to `main` or `develop`.

## Commit format

```
<type>: <description> [scope]
```

Types: `add`, `fix`, `update`, `delete`, `setup`, `refactor`, `style`
Scopes: `[scene]` `[component]` `[api]` `[store]` `[config]` `[skill]`

See `.claude/skills/commit/SKILL.md` for examples.

## PR checklist

Run before opening a PR:

```bash
npm run lint && npm run test -- --run && npm run build
```

PR description must include `## What` and `## Why` sections — enforced by CI.

## Branch protection

Applied via GitHub API on `main` and `develop`:

### `main`
- Require PR before merging
- Required status checks: `lint · test · build`
- Require branches to be up to date
- Include administrators (no bypass)
- Require linear history

### `develop`
- Require PR before merging
- Required status checks: `lint · test · build`, `require What + Why sections`
- Require branches to be up to date
- Include administrators (no bypass)

PR description check skips `dependabot[bot]` so dependency PRs are not blocked on What/Why.

## Deploy

Hosted on **Vercel** (GitHub integration). See README → Deploy.
- `main` → production
- PRs / `develop` → preview URLs

Do not commit `.vercel/` (local link metadata).
