import Phaser from 'phaser'
import { createPhaserConfig } from './config'

export function createGame(
  parent: HTMLElement,
  width: number,
  height: number,
): Phaser.Game {
  return new Phaser.Game(createPhaserConfig(parent, width, height))
}
