import { describe, expect, it } from 'vitest'
import { ASSETS } from './ASSETS'
import { imagesForPath, nextScreenImages } from './SCREEN_IMAGES'
import { SCREEN_PATHS, SCREENS } from './SCREENS'

describe('SCREEN_IMAGES', () => {
  it('holds the character-select backdrop until it can paint whole', () => {
    expect(imagesForPath(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])).toContain(
      ASSETS.ui.characterSelectionBg,
    )
  })

  it('does not curtain the world route; Phaser has its own loader', () => {
    expect(imagesForPath(SCREEN_PATHS[SCREENS.GAME])).toEqual([])
  })

  it('prefetches the next screen while the player stays put', () => {
    expect(nextScreenImages(SCREEN_PATHS[SCREENS.MAIN])).toContain(
      ASSETS.ui.characterSelectionBg,
    )
  })
})
