import { describe, expect, it } from 'vitest'
import { SCREEN_PATHS, SCREENS } from './SCREENS'

describe('SCREENS', () => {
  it('maps the character → map → game flow to paths', () => {
    expect(SCREEN_PATHS[SCREENS.CHARACTER_SELECT]).toBe('/')
    expect(SCREEN_PATHS[SCREENS.MAP]).toBe('/map')
    expect(SCREEN_PATHS[SCREENS.GAME]).toBe('/game')
  })
})
