import { describe, expect, it } from 'vitest'
import { MAP_UI } from './MAP_UI'

describe('MAP_UI', () => {
  it('keeps map copy aligned with the leaf-select layout', () => {
    expect(MAP_UI.title).toBe('Choose a leaf')
    expect(MAP_UI.backLabel).toBe('Back')
    expect(MAP_UI.subtitlePrefix).toBe('Traveling as')
  })
})
