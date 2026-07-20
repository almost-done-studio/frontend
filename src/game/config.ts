import Phaser from 'phaser'
import { GAME_CONFIG } from '../constants/GAME_CONFIG'
import { WorldScene } from '../scenes/WorldScene'

export function createPhaserConfig(
  parent: HTMLElement,
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    width: GAME_CONFIG.width,
    height: GAME_CONFIG.height,
    parent,
    backgroundColor: GAME_CONFIG.backgroundColor,
    scene: [WorldScene],
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    input: {
      activePointers: 3,
    },
    banner: false,
  }
}
