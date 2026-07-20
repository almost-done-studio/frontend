import { create } from 'zustand'
import type { SceneKey } from '../constants/SCENES'

interface GameStoreState {
  activeScene: SceneKey | null
  setActiveScene: (scene: SceneKey) => void
}

export const useGameStore = create<GameStoreState>((set) => ({
  activeScene: null,
  setActiveScene: (scene) => set({ activeScene: scene }),
}))
