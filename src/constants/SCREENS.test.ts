import { describe, expect, it } from 'vitest'
import { SCREEN_PATHS, SCREENS } from './SCREENS'

describe('SCREENS', () => {
  it('maps the main → character → map → game flow to paths', () => {
    expect(SCREEN_PATHS[SCREENS.MAIN]).toBe('/')
    expect(SCREEN_PATHS[SCREENS.CHARACTER_SELECT]).toBe('/character')
    expect(SCREEN_PATHS[SCREENS.MAP]).toBe('/map')
    expect(SCREEN_PATHS[SCREENS.GAME]).toBe('/game')
    expect(SCREEN_PATHS[SCREENS.SETTINGS]).toBe('/settings')
  })
})
