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
    expect(ASSETS.ui.world.scriptorium).toMatch(/^\/assets\/ui\/world\//)
    expect(ASSETS.ui.worldChunks.garden).toHaveLength(3)
    expect(ASSETS.characters.friarIdle).toMatch(/^\/assets\/characters\//)
  })

  it('defines Phaser texture keys', () => {
    expect(TEXTURE_KEYS.WORLD_SCRIPTORIUM).toBe('world-scriptorium')
    expect(TEXTURE_KEYS.WORLD_FOREST).toBe('world-forest')
    expect(TEXTURE_KEYS.WORLD_CLOISTER).toBe('world-cloister')
    expect(TEXTURE_KEYS.FRIAR_IDLE).toBe('friar-idle')
  })
})
