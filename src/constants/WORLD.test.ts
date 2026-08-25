import { describe, expect, it } from 'vitest'
import { LOCATIONS } from './LOCATIONS'
import {
  WORLD,
  WORLD_CHUNK_TEXTURE_KEYS,
  WORLD_TEXTURE_KEYS,
  chunkOrigin,
  chunkVariantIndex,
  clampWalkRatioInto,
  getLocationWorld,
  getWorldTextureKey,
  playerHeightRatio,
  stepTowardInto,
  worldDisplaySize,
  worldToChunkInto,
  wrapChunkGrid,
} from './WORLD'

describe('WORLD', () => {
  it('maps every location to origin plus continuation chunk textures', () => {
    for (const location of LOCATIONS) {
      expect(getWorldTextureKey(location.id)).toBe(
        WORLD_TEXTURE_KEYS[location.id],
      )
      expect(WORLD_CHUNK_TEXTURE_KEYS[location.id]).toHaveLength(3)
      expect(location.worldSrc).toMatch(/^\/assets\/ui\/world\//)
      const world = getLocationWorld(location.id)
      expect(world.spawn.y).toBeGreaterThan(0.7)
      expect(world.walk.maxY).toBeGreaterThan(world.walk.minY)
    }
  })

  it('keeps the origin leaf as variant 0 and hashes neighbors stably', () => {
    expect(chunkVariantIndex(0, 0, 3)).toBe(0)
    expect(chunkVariantIndex(1, 0, 3)).toBeGreaterThan(0)
    expect(chunkVariantIndex(1, 0, 3)).toBeLessThan(3)
    expect(chunkVariantIndex(1, 0, 3)).toBe(chunkVariantIndex(1, 0, 3))
  })

  it('wraps a pooled chunk to the far side of the 3-wide strip', () => {
    expect(wrapChunkGrid(-1, 100, 150, 3)).toBe(2)
    expect(wrapChunkGrid(2, 100, 50, 3)).toBe(-1)
    expect(chunkOrigin(3)).toBe(-1)
  })

  it('splits world pixels into grid + local even for negative space', () => {
    const out = { gridX: 0, gridY: 0, localX: 0, localY: 0 }
    worldToChunkInto(150, 20, 100, 100, out)
    expect(out).toEqual({ gridX: 1, gridY: 0, localX: 0.5, localY: 0.2 })

    worldToChunkInto(-10, -1, 100, 100, out)
    expect(out.gridX).toBe(-1)
    expect(out.localX).toBeCloseTo(0.9)
  })

  it('builds each leaf larger than the viewport', () => {
    const size = worldDisplaySize(780, 1170, 390, 844, 1.2, 1.5)
    expect(size.width).toBeGreaterThan(390)
    expect(size.height).toBeGreaterThan(844)
  })

  it('clamps feet into the walk trapezoid', () => {
    const walk = WORLD.locations.forest.walk
    const out = { x: 0, y: 0 }

    clampWalkRatioInto(0.5, -0.2, walk, out)
    expect(out.y).toBe(walk.minY)

    clampWalkRatioInto(0.5, 1.2, walk, out)
    expect(out.y).toBe(walk.maxY)
    expect(out.x).toBeGreaterThanOrEqual(walk.nearMinX)
    expect(out.x).toBeLessThanOrEqual(walk.nearMaxX)
  })

  it('shrinks the monk as they walk farther into a leaf', () => {
    const walk = WORLD.locations.forest.walk
    const near = playerHeightRatio(walk.maxY, walk, 0.28, 0.14)
    const far = playerHeightRatio(walk.minY, walk, 0.28, 0.14)
    expect(near).toBeCloseTo(0.28)
    expect(far).toBeCloseTo(0.14)
  })

  it('steps toward a target without allocating, and arrives when close', () => {
    const out = { x: 0, y: 0, arrived: false }

    stepTowardInto(0, 0, 10, 0, 3, 0, out)
    expect(out).toEqual({ x: 3, y: 0, arrived: false })

    stepTowardInto(8, 0, 10, 0, 3, 0, out)
    expect(out).toEqual({ x: 10, y: 0, arrived: true })
  })
})
