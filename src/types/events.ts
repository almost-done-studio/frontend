import type { SceneKey } from '../constants/SCENES'

export interface SceneReadyPayload {
  scene: SceneKey
}

export interface GameEventMap {
  'scene-ready': SceneReadyPayload
}

export type GameEventName = keyof GameEventMap
