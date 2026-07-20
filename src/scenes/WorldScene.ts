import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { SCENES } from '../constants/SCENES'
import { ASSETS, TEXTURE_KEYS } from '../constants/ASSETS'
import { THEME } from '../constants/THEME'
import { getCharacter } from '../constants/CHARACTERS'
import { getLocation } from '../constants/LOCATIONS'
import type { GameStartPayload } from '../types/events'

export class WorldScene extends Phaser.Scene {
  private backgroundImage!: Phaser.GameObjects.Image
  private titleText!: Phaser.GameObjects.Text
  private detailText!: Phaser.GameObjects.Text
  private playerSprite!: Phaser.GameObjects.Image
  private readonly onGameStart = (payload: GameStartPayload): void => {
    this.applyRun(payload)
  }
  private readonly onResize = (): void => {
    this.layoutScene()
  }

  constructor() {
    super({ key: SCENES.WORLD })
  }

  preload(): void {
    this.load.image(TEXTURE_KEYS.WORLD_BG, ASSETS.ui.characterSelectionBg)
    this.load.image(TEXTURE_KEYS.MAP_BG, ASSETS.ui.mapPlaceholderBg)
    this.load.image(TEXTURE_KEYS.FRIAR_IDLE, ASSETS.characters.friarIdle)
  }

  create(): void {
    this.backgroundImage = this.add.image(0, 0, TEXTURE_KEYS.WORLD_BG)
    this.titleText = this.add.text(0, 0, 'Entering the folio…', {
      fontFamily: THEME.fonts.display,
      fontSize: '26px',
      color: THEME.colors.textPrimary,
    })
    this.detailText = this.add.text(0, 0, 'Awaiting run…', {
      fontFamily: THEME.fonts.body,
      fontSize: '16px',
      color: THEME.colors.textSecondary,
      align: 'center',
    })
    this.playerSprite = this.add
      .image(0, 0, TEXTURE_KEYS.FRIAR_IDLE)
      .setOrigin(0.5, 1)
      .setVisible(false)

    this.layoutScene()
    this.scale.on('resize', this.onResize)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      this.scale.off('resize', this.onResize)
      EventBus.off('game-start', this.onGameStart)
    })

    EventBus.on('game-start', this.onGameStart)
    EventBus.emit('scene-ready', { scene: SCENES.WORLD })
  }

  private layoutScene(): void {
    const width = this.scale.width
    const height = this.scale.height
    const isLandscape = width > height

    this.backgroundImage
      .setPosition(width / 2, height / 2)
      .setDisplaySize(width, height)

    this.titleText
      .setPosition(width / 2, height * (isLandscape ? 0.18 : 0.22))
      .setOrigin(0.5)

    this.detailText
      .setPosition(width / 2, height * (isLandscape ? 0.28 : 0.3))
      .setOrigin(0.5)

    this.playerSprite.setPosition(
      width / 2,
      height * (isLandscape ? 0.88 : 0.72),
    )
  }

  private applyRun({ characterId, locationId }: GameStartPayload): void {
    const character = getCharacter(characterId)
    const location = getLocation(locationId)
    const width = this.scale.width
    const height = this.scale.height
    const isLandscape = width > height

    const bgKey =
      locationId === 'scriptorium'
        ? TEXTURE_KEYS.WORLD_BG
        : TEXTURE_KEYS.MAP_BG
    this.backgroundImage.setTexture(bgKey)
    this.backgroundImage.setDisplaySize(width, height)

    this.titleText.setText(location.name)
    this.detailText.setText(`${character.name}\n${location.blurb}`)

    const showFriar = characterId === 'monk'
    this.playerSprite.setVisible(showFriar)
    if (showFriar) {
      const targetHeight = height * (isLandscape ? 0.55 : 0.42)
      const { width: frameWidth, height: frameHeight } =
        ASSETS.spriteFrames.friarIdle
      this.playerSprite.setDisplaySize(
        (frameWidth / frameHeight) * targetHeight,
        targetHeight,
      )
    }

    this.layoutScene()
  }

  update(): void {
    // No object creation in update()
  }
}
