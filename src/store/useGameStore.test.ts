import { describe, expect, it, beforeEach } from 'vitest'
import { useGameStore } from './useGameStore'

describe('useGameStore', () => {
  beforeEach(() => {
    useGameStore.getState().clearRun()
  })

  it('selectCharacter clears previous location', () => {
    const store = useGameStore.getState()
    store.selectCharacter('monk')
    store.selectLocation('forest')
    store.selectCharacter('scribe')

    const next = useGameStore.getState()
    expect(next.selectedCharacterId).toBe('scribe')
    expect(next.selectedLocationId).toBeNull()
  })
})
