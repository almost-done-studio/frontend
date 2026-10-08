import { describe, expect, it } from 'vitest'
import {
  DESIGN_SIZE,
  GAME_CONFIG,
  getDesignSize,
  getOrientationFromViewport,
} from './GAME_CONFIG'

describe('GAME_CONFIG', () => {
  it('defaults to portrait iPhone 14 logical resolution', () => {
    expect(GAME_CONFIG.width).toBe(390)
    expect(GAME_CONFIG.height).toBe(844)
  })

  it('swaps dimensions for landscape design size', () => {
    expect(getDesignSize('landscape')).toEqual(DESIGN_SIZE.landscape)
    expect(getDesignSize('landscape').width).toBe(844)
    expect(getDesignSize('landscape').height).toBe(390)
  })

  it('detects orientation from viewport aspect ratio', () => {
    expect(getOrientationFromViewport(390, 844)).toBe('portrait')
    expect(getOrientationFromViewport(844, 390)).toBe('landscape')
  })
})
