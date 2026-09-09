import { useEffect, useState } from 'react'
import {
  getDesignSize,
  getOrientationFromViewport,
  type ViewportOrientation,
} from '../constants/GAME_CONFIG'

export interface DesignViewport {
  width: number
  height: number
  orientation: ViewportOrientation
}

const PORTRAIT_FALLBACK: DesignViewport = {
  width: 390,
  height: 844,
  orientation: 'portrait',
}

function readDesignViewport(): DesignViewport {
  const orientation = getOrientationFromViewport(
    window.innerWidth,
    window.innerHeight,
  )
  return { ...getDesignSize(orientation), orientation }
}

export function useDesignViewport(): DesignViewport {
  const [viewport, setViewport] = useState<DesignViewport>(PORTRAIT_FALLBACK)

  useEffect(() => {
    const sync = () => setViewport(readDesignViewport())
    sync()
    window.addEventListener('resize', sync)
    window.addEventListener('orientationchange', sync)
    return () => {
      window.removeEventListener('resize', sync)
      window.removeEventListener('orientationchange', sync)
    }
  }, [])

  return viewport
}
