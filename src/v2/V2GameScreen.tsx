import { Navigate, useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { getLocation } from '../constants/LOCATIONS'
import { V2_UI } from '../constants/V2_UI'
import { useGameStore } from '../store/useGameStore'
import { EventBus } from '../utils/EventBus'
import { GameHost } from '../components/GameHost'
import { LoadingOverlay } from '../components/LoadingOverlay'
import { useAfterLoad } from '../hooks/useAfterLoad'
import { Ribbon } from './chrome'
import { V2_PATHS } from './paths'
import styles from './page.module.css'

export function V2GameScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const locationId = useGameStore((s) => s.selectedLocationId)
  const { ready: hudReady, onIdle } = useAfterLoad(`${characterId ?? ''}-${locationId ?? ''}`)

  if (!characterId) {
    return <Navigate to={V2_PATHS.menu} replace />
  }

  if (!locationId) {
    return <Navigate to={V2_PATHS.map} replace />
  }

  const location = getLocation(locationId)
  const runKey = `${characterId}-${locationId}`

  return (
    <section className={`${styles.page} ${styles.world}`} aria-label={location.name}>
      {hudReady ? (
        <h1 id="v2-game-title" className={`${styles.ribbonFace} ${styles.placePlate} ${styles.hudTitle}`}>
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
          onClick={() => void navigate(V2_PATHS.map)}
        >
          <img src={ASSETS.ui.characterSelect.arrowLeft} alt="" />
          <span>{V2_UI.returnLabel}</span>
        </button>
      ) : null}
      {hudReady && characterId === 'monk' ? (
        <Ribbon
          className={styles.hudStrike}
          label={V2_UI.strikeLabel}
          onClick={() => EventBus.emit('player-attack', { characterId })}
        />
      ) : null}
    </section>
  )
}
