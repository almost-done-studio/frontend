import type { CharacterId } from '../constants/CHARACTERS'
import type { LocationId } from '../constants/LOCATIONS'
import type { SceneKey } from '../constants/SCENES'

export interface SceneReadyPayload {
  scene: SceneKey
}

export interface GameStartPayload {
  characterId: CharacterId
  locationId: LocationId
}

export interface LoadProgressPayload {
  /** 0..1 share of queued assets loaded */
  progress: number
}

export interface GameEventMap {
  'load-progress': LoadProgressPayload
  'scene-ready': SceneReadyPayload
  'game-start': GameStartPayload
}

export type GameEventName = keyof GameEventMap
