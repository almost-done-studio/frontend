import { useEffect, useRef, useState } from 'react'
import { EventBus } from '../utils/EventBus'
import { LOADING_UI, loadingPercent } from '../constants/LOADING_UI'
import type { LoadProgressPayload } from '../types/events'
import styles from './LoadingOverlay.module.css'

interface LoadingOverlayProps {
  /** Parchment sheet. The night surface stays the default. */
  surface?: 'folio'
  /** Fires once the sheet has finished fading, so controls can appear. */
  onIdle?: () => void
}

export function LoadingOverlay({ surface, onIdle }: LoadingOverlayProps) {
  const onIdleRef = useRef(onIdle)
  onIdleRef.current = onIdle
  const [percent, setPercent] = useState(0)
  const [ready, setReady] = useState(false)
  const [gone, setGone] = useState(false)

  useEffect(() => {
    const onProgress = ({ progress }: LoadProgressPayload) => {
      setPercent(loadingPercent(progress))
    }
    const onSceneReady = () => {
      setPercent(100)
      setReady(true)
    }
    EventBus.on('load-progress', onProgress)
    EventBus.on('scene-ready', onSceneReady)
    return () => {
      EventBus.off('load-progress', onProgress)
      EventBus.off('scene-ready', onSceneReady)
    }
  }, [])

  useEffect(() => {
    if (!ready) return
    const timer = window.setTimeout(() => {
      setGone(true)
      onIdleRef.current?.()
    }, LOADING_UI.fadeOutMs)
    return () => window.clearTimeout(timer)
  }, [ready])

  if (gone) return null

  return (
    <div
      className={[
        styles.overlay,
        surface === 'folio' ? styles.folio : '',
        ready ? styles.hidden : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{ transitionDuration: `${LOADING_UI.fadeOutMs}ms` }}
      data-testid="loading-overlay"
    >
      <p className={styles.title}>{LOADING_UI.title}</p>
      <div
        className={styles.track}
        role="progressbar"
        aria-label={LOADING_UI.progressLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className={styles.fill} style={{ width: `${percent}%` }} />
      </div>
      <p className={styles.percent}>{percent}%</p>
    </div>
  )
}
