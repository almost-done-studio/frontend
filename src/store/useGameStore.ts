import { create } from 'zustand'
import type { CharacterId } from '../constants/CHARACTERS'
import type { LocationId } from '../constants/LOCATIONS'
import type { SceneKey } from '../constants/SCENES'

interface GameStoreState {
  activeScene: SceneKey | null
  selectedCharacterId: CharacterId | null
  selectedLocationId: LocationId | null
  setActiveScene: (scene: SceneKey | null) => void
  selectCharacter: (id: CharacterId) => void
  selectLocation: (id: LocationId) => void
  clearRun: () => void
}

export const useGameStore = create<GameStoreState>((set) => ({
  activeScene: null,
  selectedCharacterId: null,
  selectedLocationId: null,
  setActiveScene: (scene) => set({ activeScene: scene }),
  selectCharacter: (id) =>
    set({ selectedCharacterId: id, selectedLocationId: null }),
  selectLocation: (id) => set({ selectedLocationId: id }),
  clearRun: () =>
    set({
      activeScene: null,
      selectedCharacterId: null,
      selectedLocationId: null,
    }),
}))
