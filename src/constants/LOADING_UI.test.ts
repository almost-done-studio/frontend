import { describe, expect, it } from 'vitest'
import { loadingPercent } from './LOADING_UI'

describe('loadingPercent', () => {
  it('maps loader progress to a rounded percent', () => {
    expect(loadingPercent(0)).toBe(0)
    expect(loadingPercent(0.426)).toBe(43)
    expect(loadingPercent(1)).toBe(100)
  })

  it('clamps out-of-range and invalid values', () => {
    expect(loadingPercent(-0.5)).toBe(0)
    expect(loadingPercent(1.2)).toBe(100)
    expect(loadingPercent(Number.NaN)).toBe(0)
  })
})
