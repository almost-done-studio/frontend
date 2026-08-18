/** Map / location select — copy & tokens. */
export const MAP_UI = {
  title: 'Choose a leaf',
  backLabel: 'Back',
  subtitlePrefix: 'Traveling as',
  subtitleFallback: 'Pick a location after choosing a character',
  titleFontSizePx: 42,
  backHitPx: 56,
  selectHitMinHeightPx: 56,
} as const

export type MapUi = typeof MAP_UI
