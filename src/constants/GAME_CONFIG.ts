import { THEME } from './THEME'

/** Logical design sizes — portrait is primary target, landscape swaps axes. */
export const DESIGN_SIZE = {
  portrait: { width: 390, height: 844 },
  landscape: { width: 844, height: 390 },
} as const

export type ViewportOrientation = keyof typeof DESIGN_SIZE

export type DesignSize = (typeof DESIGN_SIZE)[ViewportOrientation]

export function getOrientationFromViewport(
  viewportWidth: number,
  viewportHeight: number,
): ViewportOrientation {
  return viewportWidth > viewportHeight ? 'landscape' : 'portrait'
}

export function getDesignSize(orientation: ViewportOrientation): DesignSize {
  return DESIGN_SIZE[orientation]
}

/** Default portrait values — use getDesignSize() when orientation matters. */
export const GAME_CONFIG = {
  width: DESIGN_SIZE.portrait.width,
  height: DESIGN_SIZE.portrait.height,
  backgroundColor: THEME.colors.bgScene,
  parent: 'game-root',
} as const

export type GameConfig = typeof GAME_CONFIG
