import { THEME } from './THEME'

export const GAME_CONFIG = {
  width: 390,
  height: 844,
  backgroundColor: THEME.colors.bgScene,
  parent: 'game-root',
} as const

export type GameConfig = typeof GAME_CONFIG
