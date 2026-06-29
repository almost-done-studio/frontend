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

## Branch protection setup (GitHub → Settings → Branches)

Configure after CI is merged to `develop`:

### `main`
- Require PR before merging
- Required status checks: `lint · test · build`
- Require branches to be up to date
- Do not allow bypassing (include admins)
- Require linear history

### `develop`
- Require PR before merging
- Required status checks: `lint · test · build`
- Require branches to be up to date
