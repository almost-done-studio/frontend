import type { GameEventMap, GameEventName } from '../types/events'

type Handler<E extends GameEventName> = (payload: GameEventMap[E]) => void

const listeners = new Map<GameEventName, Set<Handler<GameEventName>>>()

export const EventBus = {
  on<E extends GameEventName>(event: E, handler: Handler<E>): void {
    const set = listeners.get(event) ?? new Set()
    set.add(handler as Handler<GameEventName>)
    listeners.set(event, set)
  },

  off<E extends GameEventName>(event: E, handler: Handler<E>): void {
    listeners.get(event)?.delete(handler as Handler<GameEventName>)
  },

  emit<E extends GameEventName>(event: E, payload: GameEventMap[E]): void {
    const set = listeners.get(event)
    if (!set) return
    for (const handler of set) {
      ;(handler as Handler<E>)(payload)
    }
  },

  clear(): void {
    listeners.clear()
  },
}
