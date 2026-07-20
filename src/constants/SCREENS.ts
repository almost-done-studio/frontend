export const SCREENS = {
  CHARACTER_SELECT: 'character-select',
  MAP: 'map',
  GAME: 'game',
} as const

export type ScreenId = (typeof SCREENS)[keyof typeof SCREENS]

export const SCREEN_PATHS = {
  [SCREENS.CHARACTER_SELECT]: '/',
  [SCREENS.MAP]: '/map',
  [SCREENS.GAME]: '/game',
} as const
