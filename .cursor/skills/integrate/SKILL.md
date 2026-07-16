---
name: integrate
description: Integrate designer assets from the assets repo into the game. Use when user runs /integrate or asks to pull new assets.
disable-model-invocation: true
---

# /integrate

Integrate new designer assets from the assets repo into the game.

## What this does
1. Scans `../assets/` for new or changed files
2. Validates naming conventions (lowercase, latin, hyphen)
3. Copies files to `public/assets/` correct subfolder
4. Adds preload calls to relevant Phaser scenes
5. Reports what was integrated

## Trigger asset-integrator agent
Uses the `asset-integrator` subagent to run in isolated context.
