import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { SCENES } from '../constants/SCENES'
import {
  ASSETS,
  FACINGS,
  MONK_ANIMATION_KEYS,
  MONK_FRAME_COUNTS,
  MONK_STATES,
  monkFramePath,
  monkFrameTextureKey,
  type Facing,
} from '../constants/ASSETS'
import { LOCATIONS, type LocationId } from '../constants/LOCATIONS'
import {
  WORLD,
  chunkOrigin,
  chunkToWorld,
  chunkVariantIndex,
  clampWalkRatioInto,
  getChunkTextureKeys,
  getLocationMap,
  getMapTextureKey,
  keyDirection,
  playerHeightRatio,
  screenFitSize,
  stepTowardInto,
  worldDisplaySize,
  worldToChunkInto,
  wrapChunkGrid,
  type ChunkRef,
  type Point2,
  type StepResult,
} from '../constants/WORLD'
import type { GameStartPayload, PlayerAttackPayload } from '../types/events'

const WALK_KEY_CODES = [
  Phaser.Input.Keyboard.KeyCodes.UP,
  Phaser.Input.Keyboard.KeyCodes.DOWN,
  Phaser.Input.Keyboard.KeyCodes.LEFT,
  Phaser.Input.Keyboard.KeyCodes.RIGHT,
  Phaser.Input.Keyboard.KeyCodes.W,
  Phaser.Input.Keyboard.KeyCodes.A,
  Phaser.Input.Keyboard.KeyCodes.S,
  Phaser.Input.Keyboard.KeyCodes.D,
]

interface MapChunk {
  image: Phaser.GameObjects.Image
  gridX: number
  gridY: number
}

export class WorldScene extends Phaser.Scene {
  private readonly chunks: MapChunk[] = []
  private playerSprite!: Phaser.GameObjects.Sprite
  private locationId: LocationId = LOCATIONS[0].id
  private canWalk = false
  private isMoving = false
  private isAttacking = false
  private facing: Facing = WORLD.player.initialFacing
  private playerDisplayHeight = 0
  private chunkWidth = 0
  private chunkHeight = 0
  private footGridX = 0
  private footGridY = 0
  private targetGridX = 0
  private targetGridY = 0
  private foot!: Point2
  private target!: Point2
  private stepOut!: StepResult
  private pointerChunk!: ChunkRef
  private movedChunk!: ChunkRef
  private keyDir!: Point2
  private keySteering = false
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys | null = null
  private walkKeys: {
    w: Phaser.Input.Keyboard.Key
    a: Phaser.Input.Keyboard.Key
    s: Phaser.Input.Keyboard.Key
    d: Phaser.Input.Keyboard.Key
  } | null = null

  private readonly onGameStart = (payload: GameStartPayload): void => {
    this.applyRun(payload)
  }
  private readonly onLoadProgress = (progress: number): void => {
    EventBus.emit('load-progress', { progress })
  }
  private readonly onResize = (): void => {
    this.layoutScene()
  }
  private readonly onPointerDown = (pointer: Phaser.Input.Pointer): void => {
    this.setTargetFromPointer(pointer)
  }
  private readonly onPointerMove = (pointer: Phaser.Input.Pointer): void => {
    if (!pointer.isDown) return
    this.setTargetFromPointer(pointer)
  }
  private readonly onPlayerAttack = ({ characterId }: PlayerAttackPayload): void => {
    if (!this.canWalk || characterId !== 'monk' || this.isAttacking) return
    if (!this.playerSprite) return
    this.isMoving = false
    this.isAttacking = true
    this.playMonkAnimation()
  }
  private readonly onMonkAnimationComplete = (
    anim: Phaser.Animations.Animation,
  ): void => {
    if (!this.isAttacking) return
    const attackKey = MONK_ANIMATION_KEYS.attack[this.facing]
    if (anim.key !== attackKey) return
    this.isAttacking = false
    this.playMonkAnimation()
  }

  constructor() {
    super({ key: SCENES.WORLD })
  }

  preload(): void {
    this.load.on(Phaser.Loader.Events.PROGRESS, this.onLoadProgress)
    this.load.once(Phaser.Loader.Events.COMPLETE, () => {
      this.load.off(Phaser.Loader.Events.PROGRESS, this.onLoadProgress)
    })
    for (const location of LOCATIONS) {
      const keys = getChunkTextureKeys(location.id)
      const paths = ASSETS.ui.mapChunks[location.id]
      for (let i = 0; i < keys.length; i += 1) {
        this.load.image(keys[i], paths[i])
      }
    }
    for (const state of MONK_STATES) {
      for (const facing of FACINGS) {
        for (let i = 0; i < MONK_FRAME_COUNTS[state]; i += 1) {
          const key = monkFrameTextureKey(state, facing, i)
          this.load.image(key, monkFramePath(key))
        }
      }
    }
  }

  create(): void {
    const spawn = getLocationMap(this.locationId).spawn
    this.foot = { x: spawn.x, y: spawn.y }
    this.target = { x: spawn.x, y: spawn.y }
    this.stepOut = { x: 0, y: 0, arrived: false }
    this.pointerChunk = { gridX: 0, gridY: 0, localX: 0, localY: 0 }
    this.movedChunk = { gridX: 0, gridY: 0, localX: 0, localY: 0 }
    this.keyDir = { x: 0, y: 0 }

    const span = WORLD.map.chunkSpan
    const origin = chunkOrigin(span)
    for (let gy = 0; gy < span; gy += 1) {
      for (let gx = 0; gx < span; gx += 1) {
        this.chunks.push({
          image: this.add
            .image(0, 0, getMapTextureKey(this.locationId))
            .setOrigin(0, 0)
            .setDepth(0),
          gridX: origin + gx,
          gridY: origin + gy,
        })
      }
    }

    this.createMonkAnimations()
    this.playerSprite = this.add
      .sprite(0, 0, monkFrameTextureKey('idle', this.facing, 0))
      .setOrigin(WORLD.player.footOriginX[this.facing], WORLD.player.originY)
      .setDepth(1)
      .setVisible(false)
    this.playerSprite.on(
      Phaser.Animations.Events.ANIMATION_COMPLETE,
      this.onMonkAnimationComplete,
    )
    this.playMonkAnimation()

    this.layoutScene()
    this.cameras.main.startFollow(
      this.playerSprite,
      true,
      WORLD.camera.lerp,
      WORLD.camera.lerp,
    )

    this.scale.on('resize', this.onResize)
    this.input.on('pointerdown', this.onPointerDown)
    this.input.on('pointermove', this.onPointerMove)
    this.bindKeyboard()

    const teardown = (): void => {
      this.scale.off('resize', this.onResize)
      this.input.off('pointerdown', this.onPointerDown)
      this.input.off('pointermove', this.onPointerMove)
      this.releaseKeyboard()
      EventBus.off('game-start', this.onGameStart)
      EventBus.off('player-attack', this.onPlayerAttack)
    }
    this.events.once(Phaser.Scenes.Events.SHUTDOWN, teardown)
    // game.destroy() emits DESTROY without SHUTDOWN
    this.events.once(Phaser.Scenes.Events.DESTROY, teardown)

    EventBus.on('game-start', this.onGameStart)
    EventBus.on('player-attack', this.onPlayerAttack)
    EventBus.emit('scene-ready', { scene: SCENES.WORLD })
  }

  private createMonkAnimations(): void {
    const { idleFps, walkFps, attackFps } = WORLD.player.animation
    for (const state of MONK_STATES) {
      for (const facing of FACINGS) {
        const key = MONK_ANIMATION_KEYS[state][facing]
        if (this.anims.exists(key)) continue
        const frames: Phaser.Types.Animations.AnimationFrame[] = []
        for (let i = 0; i < MONK_FRAME_COUNTS[state]; i += 1) {
          frames.push({ key: monkFrameTextureKey(state, facing, i) })
        }
        const frameRate =
          state === 'walk' ? walkFps : state === 'attack' ? attackFps : idleFps
        this.anims.create({
          key,
          frames,
          frameRate,
          repeat: state === 'attack' ? 0 : -1,
        })
      }
    }
  }

  private playMonkAnimation(): void {
    const state = this.isAttacking ? 'attack' : this.isMoving ? 'walk' : 'idle'
    this.playerSprite.play(MONK_ANIMATION_KEYS[state][this.facing], true)
    const originX = this.isAttacking
      ? WORLD.player.attackFootOriginX[this.facing]
      : WORLD.player.footOriginX[this.facing]
    if (
      this.playerSprite.originX !== originX ||
      this.playerSprite.originY !== WORLD.player.originY
    ) {
      this.playerSprite.setOrigin(originX, WORLD.player.originY)
    }
    this.layoutPlayerSize()
  }

  private cancelAttack(): void {
    if (!this.isAttacking) return
    this.isAttacking = false
    this.playerSprite.anims.stop()
  }

  private bindKeyboard(): void {
    const keyboard = this.input.keyboard
    if (!keyboard) return
    this.cursors = keyboard.createCursorKeys()
    this.walkKeys = {
      w: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      a: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      s: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
      d: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
    }
    keyboard.addCapture(WALK_KEY_CODES)
  }

  private releaseKeyboard(): void {
    this.input.keyboard?.removeCapture(WALK_KEY_CODES)
    this.cursors = null
    this.walkKeys = null
  }

  private moveByKeys(delta: number): boolean {
    if (!this.canWalk || this.chunkWidth <= 0 || this.chunkHeight <= 0) return false
    const cursors = this.cursors
    const keys = this.walkKeys
    keyDirection(
      Boolean(cursors?.left.isDown || keys?.a.isDown),
      Boolean(cursors?.right.isDown || keys?.d.isDown),
      Boolean(cursors?.up.isDown || keys?.w.isDown),
      Boolean(cursors?.down.isDown || keys?.s.isDown),
      this.keyDir,
    )
    if (this.keyDir.x === 0 && this.keyDir.y === 0) return false

    this.cancelAttack()
    const maxStep = WORLD.player.speed * (delta / 1000)
    const x = chunkToWorld(this.footGridX, this.foot.x, this.chunkWidth)
    const y = chunkToWorld(this.footGridY, this.foot.y, this.chunkHeight)
    worldToChunkInto(
      x + this.keyDir.x * maxStep,
      y + this.keyDir.y * maxStep,
      this.chunkWidth,
      this.chunkHeight,
      this.movedChunk,
    )
    clampWalkRatioInto(
      this.movedChunk.localX,
      this.movedChunk.localY,
      getLocationMap(this.locationId).walk,
      this.foot,
    )
    this.footGridX = this.movedChunk.gridX
    this.footGridY = this.movedChunk.gridY
    if (this.keyDir.x < 0) this.facing = 'left'
    else if (this.keyDir.x > 0) this.facing = 'right'
    this.isMoving = true
    this.placePlayer()
    this.layoutPlayerSize()
    this.wrapChunks()
    this.playMonkAnimation()
    return true
  }

  private stopKeySteering(): void {
    this.isMoving = false
    this.target.x = this.foot.x
    this.target.y = this.foot.y
    this.targetGridX = this.footGridX
    this.targetGridY = this.footGridY
    this.playMonkAnimation()
  }

  private setTargetFromPointer(pointer: Phaser.Input.Pointer): void {
    if (!this.canWalk) return
    if (this.chunkWidth <= 0 || this.chunkHeight <= 0) return
    const resumeFromAttack = this.isAttacking
    this.cancelAttack()

    worldToChunkInto(
      pointer.worldX,
      pointer.worldY,
      this.chunkWidth,
      this.chunkHeight,
      this.pointerChunk,
    )
    const walk = getLocationMap(this.locationId).walk
    clampWalkRatioInto(
      this.pointerChunk.localX,
      this.pointerChunk.localY,
      walk,
      this.target,
    )
    this.targetGridX = this.pointerChunk.gridX
    this.targetGridY = this.pointerChunk.gridY
    this.isMoving = true
    if (resumeFromAttack) this.playMonkAnimation()
  }

  private layoutPlayerSize(): void {
    const width = this.scale.width
    const height = this.scale.height
    const isLandscape = width > height
    const walk = getLocationMap(this.locationId).walk
    const near = isLandscape
      ? WORLD.player.heightRatio.landscapeNear
      : WORLD.player.heightRatio.portraitNear
    const far = isLandscape
      ? WORLD.player.heightRatio.landscapeFar
      : WORLD.player.heightRatio.portraitFar
    const ratio =
      getLocationMap(this.locationId).fit === 'screen'
        ? near
        : playerHeightRatio(this.foot.y, walk, near, far)
    const targetHeight = Math.round(height * ratio)
    if (targetHeight === this.playerDisplayHeight) return
    this.playerDisplayHeight = targetHeight
    // Scale from the body, not the current frame. Attack's canvas is taller;
    // setDisplaySize would bake that into the scale and the monk would pulse.
    const bodyHeight = this.isAttacking
      ? ASSETS.spriteFrames.monkAttack.bodyHeight
      : ASSETS.spriteFrames.monk.height
    this.playerSprite.setScale(targetHeight / bodyHeight)
  }

  /** Whole-pixel placement matches the rounded camera scroll, so the sprite does not wobble. */
  private placePlayer(): void {
    this.playerSprite.setPosition(
      Math.round(chunkToWorld(this.footGridX, this.foot.x, this.chunkWidth)),
      Math.round(chunkToWorld(this.footGridY, this.foot.y, this.chunkHeight)),
    )
  }

  private paintChunk(chunk: MapChunk): void {
    const keys = getChunkTextureKeys(this.locationId)
    const index = chunkVariantIndex(chunk.gridX, chunk.gridY, keys.length)
    chunk.image
      .setTexture(keys[index])
      .setDisplaySize(this.chunkWidth, this.chunkHeight)
      .setPosition(
        chunk.gridX * this.chunkWidth,
        chunk.gridY * this.chunkHeight,
      )
  }

  private resetChunkGrid(): void {
    const span = WORLD.map.chunkSpan
    const origin = chunkOrigin(span)
    let i = 0
    for (let gy = 0; gy < span; gy += 1) {
      for (let gx = 0; gx < span; gx += 1) {
        const chunk = this.chunks[i]
        chunk.gridX = origin + gx
        chunk.gridY = origin + gy
        this.paintChunk(chunk)
        i += 1
      }
    }
  }

  private wrapChunks(): void {
    if (this.chunkWidth <= 0 || this.chunkHeight <= 0) return
    const span = WORLD.map.chunkSpan
    const playerX = this.playerSprite.x
    const playerY = this.playerSprite.y
    for (const chunk of this.chunks) {
      const nextX = wrapChunkGrid(
        chunk.gridX,
        this.chunkWidth,
        playerX,
        span,
      )
      const nextY = wrapChunkGrid(
        chunk.gridY,
        this.chunkHeight,
        playerY,
        span,
      )
      if (nextX === chunk.gridX && nextY === chunk.gridY) continue
      chunk.gridX = nextX
      chunk.gridY = nextY
      this.paintChunk(chunk)
    }
  }

  private layoutScene(): void {
    const viewWidth = this.scale.width
    const viewHeight = this.scale.height
    const sample = this.chunks[0]?.image
    const sourceWidth = sample?.width ?? 0
    const sourceHeight = sample?.height ?? 0

    if (sourceWidth > 0 && sourceHeight > 0) {
      const display =
        getLocationMap(this.locationId).fit === 'screen'
          ? screenFitSize(sourceWidth, sourceHeight, viewWidth, viewHeight)
          : worldDisplaySize(
              sourceWidth,
              sourceHeight,
              viewWidth,
              viewHeight,
              WORLD.map.minWidthInViewports,
              WORLD.map.minHeightInViewports,
            )
      this.chunkWidth = display.width
      this.chunkHeight = display.height
    }

    const camera = this.cameras.main
    camera.setSize(viewWidth, viewHeight)
    camera.useBounds = false
    camera.setFollowOffset(0, viewHeight * WORLD.camera.followOffsetYRatio)
    camera.roundPixels = true

    for (const chunk of this.chunks) {
      this.paintChunk(chunk)
    }

    this.layoutPlayerSize()
    this.placePlayer()
    this.wrapChunks()
  }

  private applyRun({ characterId, locationId }: GameStartPayload): void {
    this.locationId = locationId
    this.canWalk = characterId === 'monk'
    this.isMoving = false
    this.isAttacking = false

    const spawn = getLocationMap(locationId).spawn
    this.footGridX = 0
    this.footGridY = 0
    this.targetGridX = 0
    this.targetGridY = 0
    this.foot.x = spawn.x
    this.foot.y = spawn.y
    this.target.x = spawn.x
    this.target.y = spawn.y

    this.facing = WORLD.player.initialFacing
    this.playMonkAnimation()
    this.playerSprite.setVisible(this.canWalk)
    this.resetChunkGrid()
    this.layoutScene()
  }

  private handleMovement(delta: number): void {
    if (!this.canWalk || !this.isMoving || this.isAttacking) return
    if (this.chunkWidth <= 0 || this.chunkHeight <= 0) return

    const targetX = chunkToWorld(
      this.targetGridX,
      this.target.x,
      this.chunkWidth,
    )
    const targetY = chunkToWorld(
      this.targetGridY,
      this.target.y,
      this.chunkHeight,
    )
    const x = chunkToWorld(this.footGridX, this.foot.x, this.chunkWidth)
    const y = chunkToWorld(this.footGridY, this.foot.y, this.chunkHeight)
    const dx = targetX - x
    if (Math.abs(dx) > 1) {
      this.facing = dx < 0 ? 'left' : 'right'
    }

    const maxStep = WORLD.player.speed * (delta / 1000)
    stepTowardInto(
      x,
      y,
      targetX,
      targetY,
      maxStep,
      WORLD.player.arriveDistance,
      this.stepOut,
    )
    worldToChunkInto(
      this.stepOut.x,
      this.stepOut.y,
      this.chunkWidth,
      this.chunkHeight,
      this.movedChunk,
    )
    const walk = getLocationMap(this.locationId).walk
    clampWalkRatioInto(
      this.movedChunk.localX,
      this.movedChunk.localY,
      walk,
      this.foot,
    )
    this.footGridX = this.movedChunk.gridX
    this.footGridY = this.movedChunk.gridY
    this.placePlayer()
    this.layoutPlayerSize()
    this.wrapChunks()
    if (this.stepOut.arrived) {
      this.isMoving = false
    }
    this.playMonkAnimation()
  }

  update(_time: number, delta: number): void {
    if (this.moveByKeys(delta)) {
      this.keySteering = true
      return
    }
    if (this.keySteering) {
      this.keySteering = false
      this.stopKeySteering()
      return
    }
    this.handleMovement(delta)
  }
}
