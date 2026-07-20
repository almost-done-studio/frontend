import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { SCENES } from '../constants/SCENES'
import { GAME_CONFIG } from '../constants/GAME_CONFIG'
import { getCharacter } from '../constants/CHARACTERS'
import { getLocation } from '../constants/LOCATIONS'
import type { GameStartPayload } from '../types/events'

export class WorldScene extends Phaser.Scene {
  private titleText!: Phaser.GameObjects.Text
  private detailText!: Phaser.GameObjects.Text
  private readonly onGameStart = (payload: GameStartPayload): void => {
    this.applyRun(payload)
  }

  constructor() {
    super({ key: SCENES.WORLD })
  }

  preload(): void {
    // Future world assets load here only
  }

  create(): void {
    const { width, height } = GAME_CONFIG

    this.add.rectangle(0, 0, width, height, 0x1a120b).setOrigin(0, 0)

    this.titleText = this.add
      .text(width / 2, height / 2 - 36, 'Entering the folio…', {
        fontFamily: 'Georgia, serif',
        fontSize: '26px',
        color: '#e8dcc8',
      })
      .setOrigin(0.5)

    this.detailText = this.add
      .text(width / 2, height / 2 + 16, 'Awaiting run…', {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        color: '#a89070',
        align: 'center',
      })
      .setOrigin(0.5)

    this.events.once(Phaser.Scenes.Events.SHUTDOWN, () => {
      EventBus.off('game-start', this.onGameStart)
    })

    EventBus.on('game-start', this.onGameStart)
    EventBus.emit('scene-ready', { scene: SCENES.WORLD })
  }

  private applyRun({ characterId, locationId }: GameStartPayload): void {
    const character = getCharacter(characterId)
    const location = getLocation(locationId)
    this.titleText.setText(location.name)
    this.detailText.setText(`${character.name}\n${location.blurb}`)
  }

  update(): void {
    // No object creation in update()
  }
}
