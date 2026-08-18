import { TEXTURE_KEYS, type TextureKey } from './ASSETS'
import type { LocationId } from './LOCATIONS'

export const WORLD_TEXTURE_KEYS = {
  scriptorium: TEXTURE_KEYS.WORLD_SCRIPTORIUM,
  forest: TEXTURE_KEYS.WORLD_FOREST,
  cloister: TEXTURE_KEYS.WORLD_CLOISTER,
} as const satisfies Record<LocationId, TextureKey>

/** Trapezoid walk area in map ratios (feet). Near = bottom of the painting. */
export interface WalkArea {
  minY: number
  maxY: number
  nearMinX: number
  nearMaxX: number
  farMinX: number
  farMaxX: number
}

export interface Point2 {
  x: number
  y: number
}

export interface StepResult extends Point2 {
  arrived: boolean
}

export interface LocationWorld {
  spawn: Point2
  walk: WalkArea
}

export const WORLD = {
  map: {
    /** World must be larger than the screen so the camera can travel. */
    minWidthInViewports: 2,
    minHeightInViewports: 2.5,
  },
  camera: {
    lerp: 0.14,
    /** Shift follow point up so the monk sits in the lower third. */
    followOffsetYRatio: 0.22,
  },
  player: {
    originX: 0.5,
    originY: 1,
    heightRatio: {
      portraitNear: 0.28,
      portraitFar: 0.14,
      landscapeNear: 0.46,
      landscapeFar: 0.22,
    },
    /** Pixels per second in world space. */
    speed: 280,
    arriveDistance: 10,
  },
  locations: {
    scriptorium: {
      spawn: { x: 0.48, y: 0.9 },
      walk: {
        minY: 0.62,
        maxY: 0.96,
        nearMinX: 0.1,
        nearMaxX: 0.9,
        farMinX: 0.2,
        farMaxX: 0.8,
      },
    },
    forest: {
      spawn: { x: 0.5, y: 0.92 },
      walk: {
        minY: 0.18,
        maxY: 0.96,
        nearMinX: 0.18,
        nearMaxX: 0.82,
        farMinX: 0.4,
        farMaxX: 0.6,
      },
    },
    cloister: {
      spawn: { x: 0.26, y: 0.9 },
      walk: {
        minY: 0.16,
        maxY: 0.96,
        nearMinX: 0.06,
        nearMaxX: 0.52,
        farMinX: 0.1,
        farMaxX: 0.28,
      },
    },
  } satisfies Record<LocationId, LocationWorld>,
} as const

export type WorldConfig = typeof WORLD

export function worldDisplaySize(
  sourceWidth: number,
  sourceHeight: number,
  viewWidth: number,
  viewHeight: number,
  minWidthRatio: number,
  minHeightRatio: number,
): { width: number; height: number } {
  const scale = Math.max(
    (viewWidth * minWidthRatio) / sourceWidth,
    (viewHeight * minHeightRatio) / sourceHeight,
  )
  return {
    width: sourceWidth * scale,
    height: sourceHeight * scale,
  }
}

export function getWorldTextureKey(locationId: LocationId): TextureKey {
  return WORLD_TEXTURE_KEYS[locationId]
}

export function getLocationWorld(locationId: LocationId): LocationWorld {
  return WORLD.locations[locationId]
}

function lerp(start: number, end: number, t: number): number {
  return start + (end - start) * t
}

export function playerHeightRatio(
  footY: number,
  walk: WalkArea,
  near: number,
  far: number,
): number {
  const span = walk.maxY - walk.minY
  const t =
    span <= 0 ? 0 : Math.min(1, Math.max(0, (walk.maxY - footY) / span))
  return lerp(near, far, t)
}

/**
 * Clamp a foot-position ratio into the location trapezoid.
 * t=0 is the far (top) edge, t=1 is the near (bottom) edge.
 */
export function clampWalkRatioInto(
  xRatio: number,
  yRatio: number,
  walk: WalkArea,
  out: Point2,
): void {
  const y = Math.min(walk.maxY, Math.max(walk.minY, yRatio))
  const span = walk.maxY - walk.minY
  const t = span <= 0 ? 1 : (y - walk.minY) / span
  const minX = lerp(walk.farMinX, walk.nearMinX, t)
  const maxX = lerp(walk.farMaxX, walk.nearMaxX, t)
  out.x = Math.min(maxX, Math.max(minX, xRatio))
  out.y = y
}

export function stepTowardInto(
  x: number,
  y: number,
  targetX: number,
  targetY: number,
  maxStep: number,
  arriveDistance: number,
  out: StepResult,
): void {
  const dx = targetX - x
  const dy = targetY - y
  const distSq = dx * dx + dy * dy
  const stopAt = Math.max(maxStep, arriveDistance)
  if (distSq <= stopAt * stopAt) {
    out.x = targetX
    out.y = targetY
    out.arrived = true
    return
  }
  const dist = Math.sqrt(distSq)
  out.x = x + (dx / dist) * maxStep
  out.y = y + (dy / dist) * maxStep
  out.arrived = false
}
