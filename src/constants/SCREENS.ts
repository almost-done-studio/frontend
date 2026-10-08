export const SCREENS = {
  MAIN: 'main',
  CHARACTER_SELECT: 'character-select',
  MAP: 'map',
  GAME: 'game',
  SETTINGS: 'settings',
} as const

export type ScreenId = (typeof SCREENS)[keyof typeof SCREENS]

export const SCREEN_PATHS = {
  [SCREENS.MAIN]: '/',
  [SCREENS.CHARACTER_SELECT]: '/character',
  [SCREENS.MAP]: '/map',
  [SCREENS.GAME]: '/game',
  [SCREENS.SETTINGS]: '/settings',
} as const
