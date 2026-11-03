export const ASSETS = {
  ui: {
    characterSelectionBg: '/assets/ui/character-selection-bg.webp',
    mapPlaceholderBg: '/assets/ui/map-placeholder-bg.png',
    /** Map select screen — parchment folio with A–Z guides. */
    mapSelectionBg: '/assets/ui/map-selection-bg.webp',
    mainMenuBg: '/assets/ui/main/main.jpg',
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
      garden: '/assets/ui/map/thumbs/forest.webp',
      scriptorium: '/assets/ui/map/thumbs/scriptorium.webp',
      cloister: '/assets/ui/map/thumbs/cloister.webp',
    },
    map: {
      garden: '/assets/ui/map/garden.png',
      scriptorium: '/assets/ui/map/castle.png',
      cloister: '/assets/ui/map/pond.png',
    },
    mapChunks: {
      garden: [
        '/assets/ui/world/forest.webp',
        '/assets/ui/world/forest-b.webp',
        '/assets/ui/world/forest-c.webp',
      ],
      scriptorium: [
        '/assets/ui/world/scriptorium.webp',
        '/assets/ui/world/scriptorium-b.webp',
        '/assets/ui/world/scriptorium-c.webp',
      ],
      cloister: [
        '/assets/ui/world/cloister.webp',
        '/assets/ui/world/cloister-b.webp',
        '/assets/ui/world/cloister-c.webp',
      ],
    },
  },
  characters: {
    monkDir: '/assets/characters/monk',
  },
  /** Known sprite dimensions for display scaling. */
  spriteFrames: {
    monk: { width: 171, height: 574 },
    /**
     * Attack canvas is taller than the body. `bodyHeight` matches the idle
     * frame so the monk stays the same size; the extra pixels are the book.
     */
    monkAttack: { width: 239, height: 641, bodyHeight: 574 },
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
export type MonkState = 'idle' | 'walk' | 'attack'

export const MONK_FRAME_COUNTS = {
  idle: 70,
  walk: 70,
  attack: 50,
} as const satisfies Record<MonkState, number>

/** Idle and walk length. Attack is shorter — see `MONK_FRAME_COUNTS`. */
export const MONK_FRAME_COUNT = MONK_FRAME_COUNTS.idle
export const MONK_STATES: readonly MonkState[] = ['idle', 'walk', 'attack']
export const FACINGS: readonly Facing[] = ['left', 'right']

/** Phaser animation keys; frames are `${key}-00` … padded to the clip length. */
export const MONK_ANIMATION_KEYS = {
  idle: { left: 'monk-idle-left', right: 'monk-idle-right' },
  walk: { left: 'monk-walk-left', right: 'monk-walk-right' },
  attack: { left: 'monk-attack-left', right: 'monk-attack-right' },
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
