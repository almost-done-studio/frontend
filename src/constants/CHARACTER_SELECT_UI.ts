/** Character select carousel — Figma copy & tokens (390×844). */
export const CHARACTER_SELECT_UI = {
  title: 'Choose Your Character',
  titleFontSizePx: 50,
  nameFontSizePx: 45,
  portraitBacking: '#7a1f1f',
  portraitSizePx: 220,
  /** Inner offset from the gold frame on top/sides. */
  portraitInset: '16%',
  /** Sit the bust on the lower rail of the frame (overrides inset bottom). */
  portraitBottomPx: 21,
  portraitMaxWidth: '70%',
  portraitMaxHeight: '80%',
  arrowHitPx: 56,
  selectHitMinHeightPx: 56,
} as const

export type CharacterSelectUi = typeof CHARACTER_SELECT_UI
