import { useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { LOADING_UI } from '../constants/LOADING_UI'
import { imagesForPath, nextScreenImages } from '../constants/SCREEN_IMAGES'
import { decodeImages, imagesAreDecoded } from '../utils/decodeImages'
import styles from './LoadingOverlay.module.css'

type Phase = 'cover' | 'fade' | 'off'

function phaseFor(pathname: string): Phase {
  const urls = imagesForPath(pathname)
  return urls.length > 0 && !imagesAreDecoded(urls) ? 'cover' : 'off'
}

export function RouteCurtain() {
  const { pathname } = useLocation()
  const urls = imagesForPath(pathname)
  const pathRef = useRef(pathname)
  pathRef.current = pathname
  const [shownPath, setShownPath] = useState(pathname)
  const [phase, setPhase] = useState<Phase>(phaseFor(pathname))

  if (shownPath !== pathname) {
    setShownPath(pathname)
    setPhase(phaseFor(pathname))
  }

  useEffect(() => {
    if (phase !== 'cover') return
    let cancel = false
    void decodeImages(urls).finally(() => {
      if (!cancel) setPhase('fade')
    })
    return () => {
      cancel = true
    }
  }, [phase, urls])

  useEffect(() => {
    if (phase !== 'fade') return
    const path = pathname
    const timer = window.setTimeout(() => {
      if (pathRef.current !== path) return
      setPhase('off')
    }, LOADING_UI.fadeOutMs)
    return () => window.clearTimeout(timer)
  }, [phase, pathname])

  useEffect(() => {
    void decodeImages(nextScreenImages(pathname))
  }, [pathname])

  if (phase === 'off') return null

  const className =
    phase === 'fade'
      ? `${styles.overlay} ${styles.curtain} ${styles.hidden}`
      : `${styles.overlay} ${styles.curtain}`

  return (
    <div
      className={className}
      style={{ transitionDuration: `${LOADING_UI.fadeOutMs}ms` }}
      data-testid="route-curtain"
      role="status"
      aria-live="polite"
      aria-label={LOADING_UI.title}
    >
      <p className={styles.title}>{LOADING_UI.title}</p>
    </div>
  )
}
