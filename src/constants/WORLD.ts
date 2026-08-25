import { TEXTURE_KEYS, type TextureKey } from './ASSETS'
import type { LocationId } from './LOCATIONS'

export const WORLD_CHUNK_TEXTURE_KEYS = {
  scriptorium: [
    TEXTURE_KEYS.WORLD_SCRIPTORIUM,
    TEXTURE_KEYS.WORLD_SCRIPTORIUM_B,
    TEXTURE_KEYS.WORLD_SCRIPTORIUM_C,
  ],
  forest: [
    TEXTURE_KEYS.WORLD_FOREST,
    TEXTURE_KEYS.WORLD_FOREST_B,
    TEXTURE_KEYS.WORLD_FOREST_C,
  ],
  cloister: [
    TEXTURE_KEYS.WORLD_CLOISTER,
    TEXTURE_KEYS.WORLD_CLOISTER_B,
    TEXTURE_KEYS.WORLD_CLOISTER_C,
  ],
} as const satisfies Record<LocationId, readonly TextureKey[]>

export const WORLD_TEXTURE_KEYS = {
  scriptorium: TEXTURE_KEYS.WORLD_SCRIPTORIUM,
  forest: TEXTURE_KEYS.WORLD_FOREST,
  cloister: TEXTURE_KEYS.WORLD_CLOISTER,
} as const satisfies Record<LocationId, TextureKey>

/** Trapezoid walk area in chunk ratios (feet). Near = bottom of the painting. */
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

export interface ChunkRef {
  gridX: number
  gridY: number
  localX: number
  localY: number
}

export interface LocationWorld {
  spawn: Point2
  walk: WalkArea
}

export const WORLD = {
  map: {
    /** Each leaf is a bit larger than the screen; neighbors fill in at the edge. */
    minWidthInViewports: 1.2,
    minHeightInViewports: 1.5,
    /** Odd span so the pool stays centered on the monk. */
    chunkSpan: 3,
  },
  camera: {
    lerp: 0.14,
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
    speed: 280,
    arriveDistance: 10,
  },
  locations: {
    scriptorium: {
      spawn: { x: 0.48, y: 0.9 },
      walk: {
        minY: 0.68,
        maxY: 0.98,
        nearMinX: 0.02,
        nearMaxX: 0.98,
        farMinX: 0.14,
        farMaxX: 0.86,
      },
    },
    forest: {
      spawn: { x: 0.5, y: 0.92 },
      walk: {
        minY: 0,
        maxY: 1,
        nearMinX: 0.2,
        nearMaxX: 0.8,
        farMinX: 0.32,
        farMaxX: 0.68,
      },
    },
    cloister: {
      spawn: { x: 0.26, y: 0.9 },
      walk: {
        minY: 0,
        maxY: 1,
        nearMinX: 0.06,
        nearMaxX: 0.52,
        farMinX: 0.08,
        farMaxX: 0.36,
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

export function getChunkTextureKeys(
  locationId: LocationId,
): readonly TextureKey[] {
  return WORLD_CHUNK_TEXTURE_KEYS[locationId]
}

export function getLocationWorld(locationId: LocationId): LocationWorld {
  return WORLD.locations[locationId]
}

export function chunkVariantIndex(
  gridX: number,
  gridY: number,
  count: number,
): number {
  if (count <= 1) return 0
  if (gridX === 0 && gridY === 0) return 0
  const n = ((gridX * 73856093) ^ (gridY * 19349663)) >>> 0
  return 1 + (n % (count - 1))
}

export function chunkOrigin(span: number): number {
  return -Math.floor(span / 2)
}

export function worldToChunkInto(
  worldX: number,
  worldY: number,
  chunkWidth: number,
  chunkHeight: number,
  out: ChunkRef,
): void {
  out.gridX = Math.floor(worldX / chunkWidth)
  out.gridY = Math.floor(worldY / chunkHeight)
  out.localX = worldX / chunkWidth - out.gridX
  out.localY = worldY / chunkHeight - out.gridY
}

export function chunkToWorld(
  grid: number,
  local: number,
  chunkSize: number,
): number {
  return (grid + local) * chunkSize
}

/** Recenter a pooled chunk along one axis so a 3-wide strip follows the player. */
export function wrapChunkGrid(
  grid: number,
  chunkSize: number,
  playerWorld: number,
  span: number,
): number {
  if (chunkSize <= 0) return grid
  const spanSize = span * chunkSize
  let next = grid
  let world = next * chunkSize
  while (world + chunkSize < playerWorld - chunkSize) {
    next += span
    world += spanSize
  }
  while (world > playerWorld + chunkSize) {
    next -= span
    world -= spanSize
  }
  return next
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
