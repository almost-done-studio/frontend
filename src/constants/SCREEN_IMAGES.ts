import { ASSETS } from './ASSETS'
import { CHARACTERS } from './CHARACTERS'
import { LOCATIONS } from './LOCATIONS'
import { SCREEN_PATHS, SCREENS } from './SCREENS'

const characterPortraits = CHARACTERS.flatMap((character) =>
  character.portraitSrc ? [character.portraitSrc] : [],
)

/** Images a screen paints immediately. The route curtain waits until these decode. */
export const SCREEN_IMAGES = {
  [SCREEN_PATHS[SCREENS.MAIN]]: [ASSETS.ui.mainMenuBg, ASSETS.ui.mainMenuFlag],
  [SCREEN_PATHS[SCREENS.CHARACTER_SELECT]]: [
    ASSETS.ui.characterSelectionBg,
    ASSETS.ui.characterSelect.arrowLeft,
    ASSETS.ui.characterSelect.arrowRight,
    ASSETS.ui.characterSelect.portraitFrame,
    ASSETS.ui.characterSelect.selectButton,
    ...characterPortraits,
  ],
  [SCREEN_PATHS[SCREENS.MAP]]: [
    ASSETS.ui.mapMockupBg,
    ASSETS.ui.mapMockupFloor,
    ASSETS.ui.characterSelect.arrowLeft,
    ASSETS.ui.characterSelect.arrowRight,
    ASSETS.ui.characterSelect.selectButton,
    ...LOCATIONS.map((location) => location.mapSrc),
  ],
  [SCREEN_PATHS[SCREENS.SETTINGS]]: [
    ASSETS.ui.mapSelectionBg,
    ASSETS.ui.characterSelect.arrowLeft,
  ],
} as const satisfies Record<string, readonly string[]>

const NEXT_SCREEN = {
  [SCREEN_PATHS[SCREENS.MAIN]]: SCREEN_PATHS[SCREENS.CHARACTER_SELECT],
  [SCREEN_PATHS[SCREENS.CHARACTER_SELECT]]: SCREEN_PATHS[SCREENS.MAP],
  [SCREEN_PATHS[SCREENS.MAP]]: SCREEN_PATHS[SCREENS.SETTINGS],
  [SCREEN_PATHS[SCREENS.SETTINGS]]: SCREEN_PATHS[SCREENS.MAIN],
} as const satisfies Record<string, string>

export function imagesForPath(pathname: string): readonly string[] {
  if (pathname in SCREEN_IMAGES) {
    return SCREEN_IMAGES[pathname as keyof typeof SCREEN_IMAGES]
  }
  return []
}

export function nextScreenImages(pathname: string): readonly string[] {
  if (pathname in NEXT_SCREEN) {
    return imagesForPath(NEXT_SCREEN[pathname as keyof typeof NEXT_SCREEN])
  }
  return []
}
