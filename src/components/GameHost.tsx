import { useEffect, useRef } from 'react'
import { EventBus } from '../utils/EventBus'
import { useGameStore } from '../store/useGameStore'
import type { SceneReadyPayload } from '../types/events'
import styles from './GameHost.module.css'

interface GameHostProps {
  className?: string
}

interface DestroyableGame {
  destroy: (removeCanvas: boolean, noReturn?: boolean) => void
}

export function GameHost({ className }: GameHostProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const setActiveScene = useGameStore((s) => s.setActiveScene)

  useEffect(() => {
    const parent = containerRef.current
    if (!parent) return

    let game: DestroyableGame | null = null
    let cancelled = false

    const onSceneReady = ({ scene }: SceneReadyPayload) => {
      setActiveScene(scene)
    }
    EventBus.on('scene-ready', onSceneReady)

    void import('../game/createGame').then(({ createGame }) => {
      if (cancelled || !containerRef.current) return
      const instance = createGame(containerRef.current)
      if (cancelled) {
        instance.destroy(true)
        return
      }
      game = instance
    })

    return () => {
      cancelled = true
      EventBus.off('scene-ready', onSceneReady)
      game?.destroy(true)
    }
  }, [setActiveScene])

  const rootClassName = className
    ? `${styles.root} ${className}`
    : styles.root

  return <div ref={containerRef} className={rootClassName} data-testid="game-host" />
}
