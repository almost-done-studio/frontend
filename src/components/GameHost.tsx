import { useEffect, useRef, useState } from 'react'
import { EventBus } from '../utils/EventBus'
import { useGameStore } from '../store/useGameStore'
import type { CharacterId } from '../constants/CHARACTERS'
import type { LocationId } from '../constants/LOCATIONS'
import type { SceneReadyPayload } from '../types/events'
import styles from './GameHost.module.css'

interface GameHostProps {
  characterId: CharacterId
  locationId: LocationId
  className?: string
}

interface ResizableGame {
  destroy: (removeCanvas: boolean, noReturn?: boolean) => void
  scale: {
    resize: (width: number, height: number) => void
  }
}

interface ContainerSize {
  width: number
  height: number
}

const MIN_CONTAINER_SIZE: ContainerSize = { width: 390, height: 844 }

function readContainerSize(element: HTMLElement): ContainerSize {
  const width = Math.round(element.clientWidth)
  const height = Math.round(element.clientHeight)
  if (width <= 0 || height <= 0) return MIN_CONTAINER_SIZE
  return { width, height }
}

export function GameHost({
  characterId,
  locationId,
  className,
}: GameHostProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const gameRef = useRef<ResizableGame | null>(null)
  const sizeRef = useRef<ContainerSize>(MIN_CONTAINER_SIZE)
  const setActiveScene = useGameStore((s) => s.setActiveScene)
  const [size, setSize] = useState<ContainerSize>(MIN_CONTAINER_SIZE)

  useEffect(() => {
    sizeRef.current = size
  }, [size])

  useEffect(() => {
    const element = containerRef.current
    if (!element) return

    const sync = () => setSize(readContainerSize(element))
    sync()

    const observer = new ResizeObserver(sync)
    observer.observe(element)
    window.addEventListener('orientationchange', sync)

    return () => {
      observer.disconnect()
      window.removeEventListener('orientationchange', sync)
    }
  }, [])

  useEffect(() => {
    const parent = containerRef.current
    if (!parent) return

    let cancelled = false
    let started = false

    const emitStart = () => {
      if (started || cancelled) return
      started = true
      EventBus.emit('game-start', { characterId, locationId })
    }

    const onSceneReady = ({ scene }: SceneReadyPayload) => {
      setActiveScene(scene)
      emitStart()
    }
    EventBus.on('scene-ready', onSceneReady)

    void import('../game/createGame').then(({ createGame }) => {
      if (cancelled || !containerRef.current) return
      const instance = createGame(
        containerRef.current,
        sizeRef.current.width,
        sizeRef.current.height,
      ) as ResizableGame
      if (cancelled) {
        instance.destroy(true)
        return
      }
      gameRef.current = instance
    })

    return () => {
      cancelled = true
      EventBus.off('scene-ready', onSceneReady)
      setActiveScene(null)
      gameRef.current?.destroy(true)
      gameRef.current = null
    }
  }, [characterId, locationId, setActiveScene])

  useEffect(() => {
    gameRef.current?.scale.resize(size.width, size.height)
  }, [size.height, size.width])

  const rootClassName = className
    ? `${styles.root} ${className}`
    : styles.root

  return <div ref={containerRef} className={rootClassName} data-testid="game-host" />
}
