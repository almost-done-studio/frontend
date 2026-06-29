# /new-scene

Create a new Phaser scene for the game.

## Usage
```
/new-scene <SceneName> [description]
```

## What this does
1. Creates `src/scenes/<SceneName>.ts` from template
2. Registers scene key in `src/constants/SCENES.ts`
3. Adds preload stub for expected assets

## Template

Replace `$SCENE_NAME` with PascalCase class name (e.g. `ForestScene`), `$SCENE_KEY` with UPPER_SNAKE key (e.g. `FOREST`).

```ts
import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { GAME_CONFIG } from '../constants/GAME_CONFIG'

export class $SCENE_NAME extends Phaser.Scene {
  constructor() {
    super({ key: '$SCENE_KEY' })
  }

  preload() {
    // TODO: load assets here
  }

  create() {
    EventBus.emit('scene-ready', { scene: '$SCENE_KEY' })
  }

  update() {
    // Only method calls here — no object creation
  }
}
```

Ask: what assets does this scene need? What React UI will overlay it?
