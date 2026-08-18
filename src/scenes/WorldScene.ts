import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { SCENES } from '../constants/SCENES'
import { ASSETS, TEXTURE_KEYS } from '../constants/ASSETS'
import { LOCATIONS, type LocationId } from '../constants/LOCATIONS'
import {
  WORLD,
  clampWalkRatioInto,
  getLocationWorld,
  getWorldTextureKey,
  playerHeightRatio,
  stepTowardInto,
  worldDisplaySize,
  type Point2,
  type StepResult,
} from '../constants/WORLD'
import type { GameStartPayload } from '../types/events'

export class WorldScene extends Phaser.Scene {
  private backgroundImage!: Phaser.GameObjects.Image
  private playerSprite!: Phaser.GameObjects.Image
  private locationId: LocationId = LOCATIONS[0].id
  private canWalk = false
  private isMoving = false
  private worldWidth = 0
  private worldHeight = 0
  private foot!: Point2
  private target!: Point2
  private stepOut!: StepResult

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
      this.load.image(getWorldTextureKey(location.id), location.worldSrc)
    }
    this.load.image(TEXTURE_KEYS.FRIAR_IDLE, ASSETS.characters.friarIdle)
  }

  create(): void {
    const spawn = getLocationWorld(this.locationId).spawn
    this.foot = { x: spawn.x, y: spawn.y }
    this.target = { x: spawn.x, y: spawn.y }
    this.stepOut = { x: 0, y: 0, arrived: false }

    this.backgroundImage = this.add
      .image(0, 0, getWorldTextureKey(this.locationId))
      .setOrigin(0, 0)
      .setDepth(0)
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
    if (this.worldWidth <= 0 || this.worldHeight <= 0) return

    const walk = getLocationWorld(this.locationId).walk
    clampWalkRatioInto(
      pointer.worldX / this.worldWidth,
      pointer.worldY / this.worldHeight,
      walk,
      this.target,
    )
    this.isMoving = true
  }

  private layoutPlayerSize(): void {
    const width = this.scale.width
    const height = this.scale.height
    const isLandscape = width > height
    const walk = getLocationWorld(this.locationId).walk
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

  private layoutScene(): void {
    const viewWidth = this.scale.width
    const viewHeight = this.scale.height
    const sourceWidth = this.backgroundImage.width
    const sourceHeight = this.backgroundImage.height

    if (sourceWidth > 0 && sourceHeight > 0) {
      const display = worldDisplaySize(
        sourceWidth,
        sourceHeight,
        viewWidth,
        viewHeight,
        WORLD.map.minWidthInViewports,
        WORLD.map.minHeightInViewports,
      )
      this.worldWidth = display.width
      this.worldHeight = display.height
      this.backgroundImage.setDisplaySize(this.worldWidth, this.worldHeight)
    }

    const camera = this.cameras.main
    camera.setSize(viewWidth, viewHeight)
    camera.setBounds(0, 0, this.worldWidth, this.worldHeight)
    camera.setFollowOffset(0, viewHeight * WORLD.camera.followOffsetYRatio)
    camera.roundPixels = true

    this.layoutPlayerSize()
    this.playerSprite.setPosition(
      this.foot.x * this.worldWidth,
      this.foot.y * this.worldHeight,
    )
  }

  private applyRun({ characterId, locationId }: GameStartPayload): void {
    this.locationId = locationId
    this.canWalk = characterId === 'monk'
    this.isMoving = false
    this.backgroundImage.setTexture(getWorldTextureKey(locationId))

    const spawn = getLocationWorld(locationId).spawn
    this.foot.x = spawn.x
    this.foot.y = spawn.y
    this.target.x = spawn.x
    this.target.y = spawn.y

    this.playerSprite.setFlipX(false)
    this.playerSprite.setVisible(this.canWalk)
    this.layoutScene()
  }

  private handleMovement(delta: number): void {
    if (!this.canWalk || !this.isMoving) return
    if (this.worldWidth <= 0 || this.worldHeight <= 0) return

    const targetX = this.target.x * this.worldWidth
    const targetY = this.target.y * this.worldHeight
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
    this.playerSprite.setPosition(this.stepOut.x, this.stepOut.y)
    this.foot.x = this.stepOut.x / this.worldWidth
    this.foot.y = this.stepOut.y / this.worldHeight
    this.layoutPlayerSize()
    if (this.stepOut.arrived) {
      this.isMoving = false
    }
  }

  update(_time: number, delta: number): void {
    this.handleMovement(delta)
  }
}
