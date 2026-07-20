import { describe, expect, it } from 'vitest'
import { GAME_CONFIG } from './GAME_CONFIG'

describe('GAME_CONFIG', () => {
  it('targets iPhone 14 logical resolution', () => {
    expect(GAME_CONFIG.width).toBe(390)
    expect(GAME_CONFIG.height).toBe(844)
  })
})
