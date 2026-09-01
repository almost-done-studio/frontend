import { describe, expect, it } from 'vitest'
import { ASSETS, TEXTURE_KEYS } from './ASSETS'

describe('ASSETS', () => {
  it('uses public asset paths for placeholder graphics', () => {
    expect(ASSETS.ui.characterSelectionBg).toMatch(/^\/assets\/ui\//)
    expect(ASSETS.ui.mapSelectionBg).toBe('/assets/ui/map-selection-bg.png')
    expect(ASSETS.ui.characterSelect.portraits.monk).toMatch(
      /^\/assets\/ui\/character-select\//,
    )
    expect(ASSETS.ui.mapThumbs.scriptorium).toMatch(/^\/assets\/ui\/map\/thumbs\//)
    expect(ASSETS.ui.map.scriptorium).toMatch(/^\/assets\/ui\/map\//)
    expect(ASSETS.ui.mapChunks.garden).toHaveLength(3)
    expect(ASSETS.characters.friarIdle).toMatch(/^\/assets\/characters\//)
  })

  it('defines Phaser texture keys', () => {
    expect(TEXTURE_KEYS.MAP_SCRIPTORIUM).toBe('map-scriptorium')
    expect(TEXTURE_KEYS.MAP_FOREST).toBe('map-forest')
    expect(TEXTURE_KEYS.MAP_CLOISTER).toBe('map-cloister')
    expect(TEXTURE_KEYS.FRIAR_IDLE).toBe('friar-idle')
  })
})
