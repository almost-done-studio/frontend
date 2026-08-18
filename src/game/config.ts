import Phaser from 'phaser'
import { THEME } from '../constants/THEME'
import { WorldScene } from '../scenes/WorldScene'

export function createPhaserConfig(
  parent: HTMLElement,
  width: number,
  height: number,
): Phaser.Types.Core.GameConfig {
  return {
    type: Phaser.AUTO,
    width,
    height,
    parent,
    backgroundColor: THEME.colors.bgScene,
    scene: [WorldScene],
    scale: {
      mode: Phaser.Scale.RESIZE,
      autoCenter: Phaser.Scale.NO_CENTER,
      width,
      height,
    },
    input: {
      activePointers: 3,
    },
    banner: false,
  }
}
