export const ASSETS = {
  ui: {
    characterSelectionBg: '/assets/ui/character-selection-bg.png',
    mapPlaceholderBg: '/assets/ui/map-placeholder-bg.png',
    /** Map select screen — parchment folio with A–Z guides. */
    mapSelectionBg: '/assets/ui/map-selection-bg.png',
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
      scriptorium: '/assets/ui/map/thumbs/scriptorium.png',
      forest: '/assets/ui/map/thumbs/forest.png',
      cloister: '/assets/ui/map/thumbs/cloister.png',
    },
    world: {
      scriptorium: '/assets/ui/world/scriptorium.png',
      forest: '/assets/ui/world/forest.png',
      cloister: '/assets/ui/world/cloister.png',
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
  WORLD_SCRIPTORIUM: 'world-scriptorium',
  WORLD_FOREST: 'world-forest',
  WORLD_CLOISTER: 'world-cloister',
  FRIAR_IDLE: 'friar-idle',
} as const

export type TextureKey = (typeof TEXTURE_KEYS)[keyof typeof TEXTURE_KEYS]
