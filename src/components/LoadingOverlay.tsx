import { useEffect, useState } from 'react'
import { EventBus } from '../utils/EventBus'
import { LOADING_UI, loadingPercent } from '../constants/LOADING_UI'
import type { LoadProgressPayload } from '../types/events'
import styles from './LoadingOverlay.module.css'

export function LoadingOverlay() {
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
    const timer = window.setTimeout(() => setGone(true), LOADING_UI.fadeOutMs)
    return () => window.clearTimeout(timer)
  }, [ready])

  if (gone) return null

  return (
    <div
      className={ready ? `${styles.overlay} ${styles.hidden}` : styles.overlay}
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
