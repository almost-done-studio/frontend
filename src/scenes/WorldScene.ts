import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { SCENES } from '../constants/SCENES'
import { GAME_CONFIG } from '../constants/GAME_CONFIG'
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

  constructor() {
    super({ key: SCENES.WORLD })
  }

  preload(): void {
    this.load.image(TEXTURE_KEYS.WORLD_BG, ASSETS.ui.characterSelectionBg)
    this.load.image(TEXTURE_KEYS.MAP_BG, ASSETS.ui.mapPlaceholderBg)
    this.load.image(TEXTURE_KEYS.FRIAR_IDLE, ASSETS.characters.friarIdle)
  }

  create(): void {
    const { width, height } = GAME_CONFIG

    this.backgroundImage = this.add
      .image(width / 2, height / 2, TEXTURE_KEYS.WORLD_BG)
      .setDisplaySize(width, height)

    this.titleText = this.add
      .text(width / 2, height * 0.22, 'Entering the folio…', {
        fontFamily: THEME.fonts.display,
        fontSize: '26px',
        color: THEME.colors.textPrimary,
      })
      .setOrigin(0.5)

    this.detailText = this.add
      .text(width / 2, height * 0.3, 'Awaiting run…', {
        fontFamily: THEME.fonts.body,
        fontSize: '16px',
        color: THEME.colors.textSecondary,
        align: 'center',
      })
      .setOrigin(0.5)

    this.playerSprite = this.add
      .image(width / 2, height * 0.72, TEXTURE_KEYS.FRIAR_IDLE)
      .setOrigin(0.5, 1)
      .setVisible(false)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventBus.off('game-start', this.onGameStart)
    })

    EventBus.on('game-start', this.onGameStart)
    EventBus.emit('scene-ready', { scene: SCENES.WORLD })
  }

  private applyRun({ characterId, locationId }: GameStartPayload): void {
    const character = getCharacter(characterId)
    const location = getLocation(locationId)

    const bgKey =
      locationId === 'scriptorium'
        ? TEXTURE_KEYS.WORLD_BG
        : TEXTURE_KEYS.MAP_BG
    this.backgroundImage.setTexture(bgKey)
    this.backgroundImage.setDisplaySize(GAME_CONFIG.width, GAME_CONFIG.height)

    this.titleText.setText(location.name)
    this.detailText.setText(`${character.name}\n${location.blurb}`)

    const showFriar = characterId === 'monk'
    this.playerSprite.setVisible(showFriar)
    if (showFriar) {
      const targetHeight = GAME_CONFIG.height * 0.42
      const { width, height } = ASSETS.spriteFrames.friarIdle
      this.playerSprite.setDisplaySize(
        (width / height) * targetHeight,
        targetHeight,
      )
    }
  }

  update(): void {
    // No object creation in update()
  }
}
