import { describe, expect, it } from 'vitest'
import {
  ASSETS,
  MONK_ANIMATION_KEYS,
  MONK_FRAME_COUNT,
  MONK_FRAME_COUNTS,
  TEXTURE_KEYS,
  monkFramePath,
  monkFrameTextureKey,
} from './ASSETS'

describe('ASSETS', () => {
  it('uses public asset paths for placeholder graphics', () => {
    expect(ASSETS.ui.characterSelectionBg).toMatch(/^\/assets\/ui\//)
    expect(ASSETS.ui.mapSelectionBg).toBe('/assets/ui/map-selection-bg.png')
    expect(ASSETS.ui.mainMenuBg).toBe('/assets/ui/main/main.jpg')
    expect(ASSETS.ui.mainMenuFlag).toBe('/assets/ui/main/flag.png')
    expect(ASSETS.ui.characterSelect.portraits.monk).toMatch(
      /^\/assets\/ui\/character-select\//,
    )
    expect(ASSETS.ui.mapThumbs.scriptorium).toMatch(/^\/assets\/ui\/map\/thumbs\//)
    expect(ASSETS.ui.map.scriptorium).toMatch(/^\/assets\/ui\/map\//)
    expect(ASSETS.ui.mapChunks.garden).toHaveLength(3)
    expect(ASSETS.characters.monkDir).toBe('/assets/characters/monk')
  })

  it('defines Phaser texture keys', () => {
    expect(TEXTURE_KEYS.MAP_SCRIPTORIUM).toBe('map-scriptorium')
    expect(TEXTURE_KEYS.MAP_FOREST).toBe('map-forest')
    expect(TEXTURE_KEYS.MAP_CLOISTER).toBe('map-cloister')
  })

  it('names Monk frames after the kebab-case files in public/assets', () => {
    expect(MONK_ANIMATION_KEYS.walk.left).toBe('monk-walk-left')
    expect(monkFrameTextureKey('idle', 'right', 0)).toBe('monk-idle-right-00')
    expect(
      monkFrameTextureKey('walk', 'left', MONK_FRAME_COUNT - 1),
    ).toBe('monk-walk-left-69')
    expect(monkFramePath('monk-walk-right-07')).toBe(
      '/assets/characters/monk/monk-walk-right-07.png',
    )
    expect(MONK_FRAME_COUNTS.attack).toBe(50)
    expect(monkFrameTextureKey('attack', 'left', 0)).toBe('monk-attack-left-00')
    expect(
      monkFrameTextureKey('attack', 'right', MONK_FRAME_COUNTS.attack - 1),
    ).toBe('monk-attack-right-49')
    expect(ASSETS.spriteFrames.monkAttack).toEqual({
      width: 239,
      height: 641,
      bodyHeight: 574,
    })
  })
})
