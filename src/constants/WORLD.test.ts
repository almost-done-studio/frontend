import { describe, expect, it } from 'vitest'
import { LOCATIONS } from './LOCATIONS'
import {
  WORLD,
  WORLD_TEXTURE_KEYS,
  clampWalkRatioInto,
  getLocationWorld,
  getWorldTextureKey,
  playerHeightRatio,
  stepTowardInto,
  worldDisplaySize,
} from './WORLD'

describe('WORLD', () => {
  it('maps every location to a Phaser world texture and walk area', () => {
    for (const location of LOCATIONS) {
      expect(getWorldTextureKey(location.id)).toBe(
        WORLD_TEXTURE_KEYS[location.id],
      )
      expect(location.worldSrc).toMatch(/^\/assets\/ui\/world\//)
      const world = getLocationWorld(location.id)
      expect(world.spawn.y).toBeGreaterThan(0.7)
      expect(world.walk.maxY).toBeGreaterThan(world.walk.minY)
    }
  })

  it('builds a world larger than the viewport so the camera can travel', () => {
    const size = worldDisplaySize(780, 1170, 390, 844, 2, 2.5)
    expect(size.width).toBeGreaterThan(390)
    expect(size.height).toBeGreaterThan(844)
    expect(size.width / size.height).toBeCloseTo(780 / 1170)
  })

  it('clamps feet into the walk trapezoid', () => {
    const walk = WORLD.locations.forest.walk
    const out = { x: 0, y: 0 }

    clampWalkRatioInto(0.5, 0.05, walk, out)
    expect(out.y).toBe(walk.minY)

    clampWalkRatioInto(0.5, 0.99, walk, out)
    expect(out.y).toBe(walk.maxY)
    expect(out.x).toBeGreaterThanOrEqual(walk.nearMinX)
    expect(out.x).toBeLessThanOrEqual(walk.nearMaxX)

    clampWalkRatioInto(0.01, walk.minY, walk, out)
    expect(out.x).toBe(walk.farMinX)
  })

  it('shrinks the monk as they walk farther into the map', () => {
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

    stepTowardInto(0, 0, 10, 0, 3, 12, out)
    expect(out).toEqual({ x: 10, y: 0, arrived: true })
  })

  it('keeps the monk origin at the feet', () => {
    expect(WORLD.player.originY).toBe(1)
    expect(WORLD.player.speed).toBeGreaterThan(0)
  })
})
