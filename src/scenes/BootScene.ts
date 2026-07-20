import Phaser from 'phaser'
import { EventBus } from '../utils/EventBus'
import { SCENES } from '../constants/SCENES'
import { GAME_CONFIG } from '../constants/GAME_CONFIG'

export class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: SCENES.BOOT })
  }

  preload(): void {
    // No assets yet — load all future assets here, never in create()
  }

  create(): void {
    const { width, height } = GAME_CONFIG
    const cx = width / 2
    const cy = height / 2

    this.add
      .rectangle(0, 0, width, height, 0x1a120b)
      .setOrigin(0, 0)

    this.add
      .text(cx, cy - 24, 'AlmostDoneStudio', {
        fontFamily: 'Georgia, serif',
        fontSize: '28px',
        color: '#e8dcc8',
      })
      .setOrigin(0.5)

    this.add
      .text(cx, cy + 20, 'Boot scene ready', {
        fontFamily: 'Georgia, serif',
        fontSize: '16px',
        color: '#a89070',
      })
      .setOrigin(0.5)

    EventBus.emit('scene-ready', { scene: SCENES.BOOT })
  }

  update(): void {
    // Intentionally empty — no object creation in update()
  }
}
