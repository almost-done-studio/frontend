import { Navigate, useNavigate } from 'react-router-dom'
import { GameHost } from '../components/GameHost'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { ASSETS } from '../constants/ASSETS'
import { getLocation } from '../constants/LOCATIONS'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { UI } from '../constants/UI'
import { useAfterLoad } from '../hooks/useAfterLoad'
import { useGameStore } from '../store/useGameStore'
import { EventBus } from '../utils/EventBus'
import { Ribbon } from './chrome'
import styles from './page.module.css'

export function GameScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const locationId = useGameStore((s) => s.selectedLocationId)
  const { ready: hudReady, onIdle } = useAfterLoad(`${characterId ?? ''}-${locationId ?? ''}`)

  if (!characterId) {
    return <Navigate to={SCREEN_PATHS[SCREENS.MAIN]} replace />
  }

  if (!locationId) {
    return <Navigate to={SCREEN_PATHS[SCREENS.MAP]} replace />
  }

  const location = getLocation(locationId)
  const runKey = `${characterId}-${locationId}`

  return (
    <section className={`${styles.page} ${styles.world}`} aria-label={location.name}>
      {hudReady ? (
        <h1 id="game-title" className={`${styles.ribbonFace} ${styles.placePlate} ${styles.hudTitle}`}>
          {location.name}
        </h1>
      ) : null}
      <div className={styles.stage}>
        <GameHost
          className={styles.stageFill}
          characterId={characterId}
          locationId={locationId}
        />
        <LoadingOverlay surface="folio" key={runKey} onIdle={onIdle} />
      </div>
      {hudReady ? (
        <button
          type="button"
          className={styles.back}
          onClick={() => void navigate(SCREEN_PATHS[SCREENS.MAP])}
        >
          <img src={ASSETS.ui.characterSelect.arrowLeft} alt="" />
          <span>{UI.returnLabel}</span>
        </button>
      ) : null}
      {hudReady && characterId === 'monk' ? (
        <Ribbon
          className={styles.hudStrike}
          label={UI.strikeLabel}
          onClick={() => EventBus.emit('player-attack', { characterId })}
        />
      ) : null}
    </section>
  )
}
