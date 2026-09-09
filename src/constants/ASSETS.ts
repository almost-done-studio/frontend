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
    friarIdle: '/assets/characters/friar-idle.png',
  },
  /** Known sprite dimensions for placeholder scaling. */
  spriteFrames: {
    friarIdle: { width: 193, height: 590 },
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
  FRIAR_IDLE: 'friar-idle',
} as const

export type TextureKey = (typeof TEXTURE_KEYS)[keyof typeof TEXTURE_KEYS]
