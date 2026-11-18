import { useCallback, useState } from 'react'

/**
 * Controls stay hidden until the loading sheet for this run has faded out.
 * A new character or location starts the wait over.
 */
export function useAfterLoad(runKey: string): {
  ready: boolean
  onIdle: () => void
} {
  const [gate, setGate] = useState({ runKey, ready: false })

  if (gate.runKey !== runKey) {
    setGate({ runKey, ready: false })
  }

  const onIdle = useCallback(() => {
    setGate((current) =>
      current.runKey === runKey ? { runKey, ready: true } : current,
    )
  }, [runKey])

  return { ready: gate.ready, onIdle }
}
