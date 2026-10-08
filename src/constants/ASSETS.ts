export const ASSETS = {
  ui: {
    characterSelectionBg: '/assets/ui/character-selection-bg.png',
    mapPlaceholderBg: '/assets/ui/map-placeholder-bg.png',
    /** Map select screen — parchment folio with A–Z guides. */
    mapSelectionBg: '/assets/ui/map-selection-bg.png',
    mainMenuBg: '/assets/ui/main/main.png',
    mainMenuFlag: '/assets/ui/main/flag.png',
    fullMoon: '/assets/ui/full-moon.png',
    crescentMoon: '/assets/ui/crescent-moon.png',
    friarIcon: '/assets/ui/friar-icon.png',
    nameFlag: '/assets/ui/name-flag.png',
    arrowLeft: '/assets/ui/arrow-left.png',
    arrowRight: '/assets/ui/arrow-right.png',
    characterSelect: {
      arrowLeft: '/assets/ui/character-select/arrow-left.png',
      arrowRight: '/assets/ui/character-select/arrow-right.png',
      portraitFrame: '/assets/ui/character-select/portrait-frame.png',
      selectButton: '/assets/ui/character-select/select-button.png',
      portraits: {
        monk: '/assets/ui/character-select/portraits/monk.png',
      },
    },
    mapThumbs: {
      garden: '/assets/ui/map/thumbs/forest.png',
      scriptorium: '/assets/ui/map/thumbs/scriptorium.png',
      cloister: '/assets/ui/map/thumbs/cloister.png',
    },
    map: {
      garden: '/assets/ui/map/garden.png',
      scriptorium: '/assets/ui/map/castle.png',
      cloister: '/assets/ui/map/pond.png',
    },
    mapChunks: {
      garden: [
        '/assets/ui/world/forest.png',
        '/assets/ui/world/forest-b.png',
        '/assets/ui/world/forest-c.png',
      ],
      scriptorium: [
        '/assets/ui/world/scriptorium.png',
        '/assets/ui/world/scriptorium-b.png',
        '/assets/ui/world/scriptorium-c.png',
      ],
      cloister: [
        '/assets/ui/world/cloister.png',
        '/assets/ui/world/cloister-b.png',
        '/assets/ui/world/cloister-c.png',
      ],
    },
  },
  characters: {
    monkDir: '/assets/characters/monk',
  },
  /** Known sprite dimensions for display scaling. */
  spriteFrames: {
    monk: { width: 171, height: 574 },
  },
  fonts: {
    modernAntiqua: '/assets/fonts/modern-antiqua-book.ttf',
    orotund: '/assets/fonts/orotund.ttf',
  },
} as const

/** Phaser texture keys — keep in sync with preload() calls. */
export const TEXTURE_KEYS = {
  MAP_SCRIPTORIUM: 'map-scriptorium',
  MAP_SCRIPTORIUM_B: 'map-scriptorium-b',
  MAP_SCRIPTORIUM_C: 'map-scriptorium-c',
  MAP_FOREST: 'map-forest',
  MAP_FOREST_B: 'map-forest-b',
  MAP_FOREST_C: 'map-forest-c',
  MAP_CLOISTER: 'map-cloister',
  MAP_CLOISTER_B: 'map-cloister-b',
  MAP_CLOISTER_C: 'map-cloister-c',
} as const

export type TextureKey = (typeof TEXTURE_KEYS)[keyof typeof TEXTURE_KEYS]

export type Facing = 'left' | 'right'
export type MonkState = 'idle' | 'walk'

export const MONK_FRAME_COUNT = 70
export const MONK_STATES: readonly MonkState[] = ['idle', 'walk']
export const FACINGS: readonly Facing[] = ['left', 'right']

/** Phaser animation keys; frame textures are `${key}-00` … `${key}-69`. */
export const MONK_ANIMATION_KEYS = {
  idle: { left: 'monk-idle-left', right: 'monk-idle-right' },
  walk: { left: 'monk-walk-left', right: 'monk-walk-right' },
} as const satisfies Record<MonkState, Record<Facing, string>>

export function monkFrameTextureKey(
  state: MonkState,
  facing: Facing,
  index: number,
): string {
  return `${MONK_ANIMATION_KEYS[state][facing]}-${String(index).padStart(2, '0')}`
}

export function monkFramePath(textureKey: string): string {
  return `${ASSETS.characters.monkDir}/${textureKey}.png`
}
