---
name: phaser
description: Phaser 3 patterns for mobile top-down game. Apply when working on scenes, sprites, tilemaps, or touch input.
---

# Phaser 3 — Mobile Top-Down Patterns

## Scene structure (always follow this order)
```ts
export class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite

  constructor() { super({ key: 'GameScene' }) }

  preload() {
    // ALL asset loading here — never in create()
    this.load.spritesheet('monk', 'monk.png', { frameWidth: 32, frameHeight: 48 })
    this.load.tilemapTiledJSON('map', 'map.json')
  }

  create() {
    // Setup scene, physics, animations, input
    this.player = this.physics.add.sprite(200, 200, 'monk')
    this.setupAnimations()
    this.setupInput()
  }

  update() {
    // Only READ state and call methods — never create objects here
    this.handleMovement()
  }
}
```

## Mobile touch input (no keyboard)
```ts
private setupInput() {
  // Virtual joystick (rexvirtualjoystick plugin)
  this.joystick = this.plugins.get('rexvirtualjoystick').add(this, {
    x: 100, y: 600, radius: 60, fixed: true
  })

  // Direct touch fallback
  this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
    if (p.isDown) this.moveToward(p.worldX, p.worldY)
  })
}
```

## Scale config (always use this for mobile)
```ts
const config: Phaser.Types.Core.GameConfig = {
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 390,
    height: 844
  }
}
```

## EventBus (only way to talk to React)
```ts
// In Phaser scene
EventBus.emit('location-changed', { name: 'Forest' })

// In React component
useEffect(() => {
  EventBus.on('location-changed', ({ name }) => setLocation(name))
  return () => EventBus.off('location-changed')
}, [])
```

## Animations
```ts
private setupAnimations() {
  ['up', 'down', 'left', 'right'].forEach(dir => {
    this.anims.create({
      key: `walk-${dir}`,
      frames: this.anims.generateFrameNumbers('monk', { start: 0, end: 2 }),
      frameRate: 8,
      repeat: -1
    })
  })
}
```

## Never
- Create objects in update()
- Import React in a Phaser scene
- Use keyboard input (mobile only)
- Hardcode positions — use GAME_CONFIG constants
