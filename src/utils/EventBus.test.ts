import { describe, expect, it, beforeEach } from 'vitest'
import { EventBus } from './EventBus'
import { SCENES } from '../constants/SCENES'

describe('EventBus', () => {
  beforeEach(() => {
    EventBus.clear()
  })

  it('delivers typed payloads to subscribers', () => {
    const received: string[] = []
    EventBus.on('scene-ready', ({ scene }) => {
      received.push(scene)
    })

    EventBus.emit('scene-ready', { scene: SCENES.BOOT })

    expect(received).toEqual([SCENES.BOOT])
  })

  it('does not call handlers after off', () => {
    let calls = 0
    const handler = () => {
      calls += 1
    }
    EventBus.on('scene-ready', handler)
    EventBus.off('scene-ready', handler)
    EventBus.emit('scene-ready', { scene: SCENES.BOOT })
    expect(calls).toBe(0)
  })
})
