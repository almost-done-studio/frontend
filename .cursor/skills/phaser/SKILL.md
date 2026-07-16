---
name: phaser
description: Phaser 3 patterns for mobile top-down game. Apply when working on scenes, sprites, tilemaps, or touch input.
---

# Phaser 3 — Mobile Top-Down Patterns

## Scene structure
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

## Mobile touch input
```ts
private setupInput() {
  this.joystick = this.plugins.get('rexvirtualjoystick').add(this, {
    x: 100, y: 600, radius: 60, fixed: true
  })
  this.input.on('pointermove', (p: Phaser.Input.Pointer) => {
    if (p.isDown) this.moveToward(p.worldX, p.worldY)
  })
}
```

## Scale config (always)
```ts
scale: {
  mode: Phaser.Scale.FIT,
  autoCenter: Phaser.Scale.CENTER_BOTH,
  width: 390,
  height: 844
}
```

## EventBus
```ts
// Phaser → React
EventBus.emit('location-changed', { name: 'Forest' })

// React → Phaser (in useEffect)
useEffect(() => {
  const handler = ({ name }: { name: string }) => setLocation(name)
  EventBus.on('location-changed', handler)
  return () => EventBus.off('location-changed', handler)
}, [])
```

## Never
- Create objects in `update()`
- Import React in Phaser scenes
- Import Phaser in React components
- Use keyboard input (mobile only)
- Hardcode positions — use GAME_CONFIG constants
