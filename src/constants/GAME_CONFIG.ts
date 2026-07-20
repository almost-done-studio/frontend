export const GAME_CONFIG = {
  width: 390,
  height: 844,
  backgroundColor: '#1a120b',
  parent: 'game-root',
} as const

export type GameConfig = typeof GAME_CONFIG
