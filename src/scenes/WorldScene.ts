import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { SCENES } from '../constants/SCENES'
import { ASSETS, TEXTURE_KEYS } from '../constants/ASSETS'
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
  playerHeightRatio,
  stepTowardInto,
  worldDisplaySize,
  worldToChunkInto,
  wrapChunkGrid,
  type ChunkRef,
  type Point2,
  type StepResult,
} from '../constants/WORLD'
import type { GameStartPayload } from '../types/events'

interface MapChunk {
  image: Phaser.GameObjects.Image
  gridX: number
  gridY: number
}

export class WorldScene extends Phaser.Scene {
  private readonly chunks: MapChunk[] = []
  private playerSprite!: Phaser.GameObjects.Image
  private locationId: LocationId = LOCATIONS[0].id
  private canWalk = false
  private isMoving = false
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

  private readonly onGameStart = (payload: GameStartPayload): void => {
    this.applyRun(payload)
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

  constructor() {
    super({ key: SCENES.WORLD })
  }

  preload(): void {
    for (const location of LOCATIONS) {
      const keys = getChunkTextureKeys(location.id)
      const paths = ASSETS.ui.mapChunks[location.id]
      for (let i = 0; i < keys.length; i += 1) {
        this.load.image(keys[i], paths[i])
      }
    }
    this.load.image(TEXTURE_KEYS.FRIAR_IDLE, ASSETS.characters.friarIdle)
  }

  create(): void {
    const spawn = getLocationMap(this.locationId).spawn
    this.foot = { x: spawn.x, y: spawn.y }
    this.target = { x: spawn.x, y: spawn.y }
    this.stepOut = { x: 0, y: 0, arrived: false }
    this.pointerChunk = { gridX: 0, gridY: 0, localX: 0, localY: 0 }
    this.movedChunk = { gridX: 0, gridY: 0, localX: 0, localY: 0 }

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

    this.playerSprite = this.add
      .image(0, 0, TEXTURE_KEYS.FRIAR_IDLE)
      .setOrigin(WORLD.player.originX, WORLD.player.originY)
      .setDepth(1)
      .setVisible(false)

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

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.onResize)
      this.input.off('pointerdown', this.onPointerDown)
      this.input.off('pointermove', this.onPointerMove)
      EventBus.off('game-start', this.onGameStart)
    })

    EventBus.on('game-start', this.onGameStart)
    EventBus.emit('scene-ready', { scene: SCENES.WORLD })
  }

  private setTargetFromPointer(pointer: Phaser.Input.Pointer): void {
    if (!this.canWalk) return
    if (this.chunkWidth <= 0 || this.chunkHeight <= 0) return

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
  }

  private layoutPlayerSize(): void {
    const width = this.scale.width
    const height = this.scale.height
    const isLandscape = width > height
    const walk = getLocationMap(this.locationId).walk
    const ratio = playerHeightRatio(
      this.foot.y,
      walk,
      isLandscape
        ? WORLD.player.heightRatio.landscapeNear
        : WORLD.player.heightRatio.portraitNear,
      isLandscape
        ? WORLD.player.heightRatio.landscapeFar
        : WORLD.player.heightRatio.portraitFar,
    )
    const targetHeight = height * ratio
    const { width: frameWidth, height: frameHeight } =
      ASSETS.spriteFrames.friarIdle
    this.playerSprite.setDisplaySize(
      (frameWidth / frameHeight) * targetHeight,
      targetHeight,
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
      const display = worldDisplaySize(
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
    this.playerSprite.setPosition(
      chunkToWorld(this.footGridX, this.foot.x, this.chunkWidth),
      chunkToWorld(this.footGridY, this.foot.y, this.chunkHeight),
    )
    this.wrapChunks()
  }

  private applyRun({ characterId, locationId }: GameStartPayload): void {
    this.locationId = locationId
    this.canWalk = characterId === 'monk'
    this.isMoving = false

    const spawn = getLocationMap(locationId).spawn
    this.footGridX = 0
    this.footGridY = 0
    this.targetGridX = 0
    this.targetGridY = 0
    this.foot.x = spawn.x
    this.foot.y = spawn.y
    this.target.x = spawn.x
    this.target.y = spawn.y

    this.playerSprite.setFlipX(false)
    this.playerSprite.setVisible(this.canWalk)
    this.resetChunkGrid()
    this.layoutScene()
  }

  private handleMovement(delta: number): void {
    if (!this.canWalk || !this.isMoving) return
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
    const x = this.playerSprite.x
    const y = this.playerSprite.y
    const dx = targetX - x
    if (Math.abs(dx) > 1) {
      this.playerSprite.setFlipX(dx < 0)
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
    this.playerSprite.setPosition(
      chunkToWorld(this.footGridX, this.foot.x, this.chunkWidth),
      chunkToWorld(this.footGridY, this.foot.y, this.chunkHeight),
    )
    this.layoutPlayerSize()
    this.wrapChunks()
    if (this.stepOut.arrived) {
      this.isMoving = false
    }
  }

  update(_time: number, delta: number): void {
    this.handleMovement(delta)
  }
}
