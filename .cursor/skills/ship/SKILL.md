---
name: ship
description: Prepare branch for PR — run checks and generate PR description. Use when user runs /ship or asks to prepare a pull request.
disable-model-invocation: true
---

# /ship

Prepare branch for PR — run all checks and generate PR description.

## What this does
1. Runs full check suite:
```bash
npm run lint
npm run test
npm run build
```
2. If all pass — generates PR description with:
   - What changed and why
   - Screenshots/test notes placeholder
   - Checklist of reviewed items
3. If any fail — stops and reports exactly what to fix

## PR description format
```
## What
<what was built or fixed>

## Why
<reason / linked issue>

## Checklist
- [ ] lint passes
- [ ] tests pass
- [ ] build passes
- [ ] tested at 390x844
- [ ] no hardcoded values
- [ ] no any in TypeScript
```

Trigger `pr-reviewer` agent for full automated review before outputting description.
