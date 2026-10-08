import { describe, expect, it } from 'vitest'
import { MAP_UI } from './MAP_UI'

describe('MAP_UI', () => {
  it('keeps map copy aligned with the map-select layout', () => {
    expect(MAP_UI.title).toBe('Choose Your Map')
    expect(MAP_UI.backLabel).toBe('Back')
    expect(MAP_UI.subtitlePrefix).toBe('Traveling as')
  })
})
