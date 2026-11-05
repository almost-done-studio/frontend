import { Navigate, useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { getLocation } from '../constants/LOCATIONS'
import { MAP_UI } from '../constants/MAP_UI'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { useGameStore } from '../store/useGameStore'
import { EventBus } from '../utils/EventBus'
import { GameHost } from './GameHost'
import { LoadingOverlay } from './LoadingOverlay'
import styles from './GameScreen.module.css'

export function GameScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const locationId = useGameStore((s) => s.selectedLocationId)

  if (!characterId) {
    return <Navigate to={SCREEN_PATHS[SCREENS.MAIN]} replace />
  }

  if (!locationId) {
    return <Navigate to={SCREEN_PATHS[SCREENS.MAP]} replace />
  }

  const location = getLocation(locationId)

  return (
    <section className={styles.screen} aria-labelledby="game-title">
      <div className={styles.stage}>
        <GameHost characterId={characterId} locationId={locationId} />
        <LoadingOverlay key={`${characterId}-${locationId}`} />
      </div>
      <h1 id="game-title" className={styles.title}>
        {location.name}
      </h1>
      <button
        type="button"
        className={styles.back}
        onClick={() => void navigate(SCREEN_PATHS[SCREENS.MAP])}
        aria-label={MAP_UI.backLabel}
      >
        <img
          className={styles.backIcon}
          src={ASSETS.ui.characterSelect.arrowLeft}
          alt=""
          aria-hidden="true"
        />
        <span className={styles.backLabel}>{MAP_UI.backLabel}</span>
      </button>
      {characterId === 'monk' ? (
        <button
          type="button"
          className={styles.attack}
          onClick={() => EventBus.emit('player-attack', { characterId })}
          aria-label="Attack"
        >
          <img src={ASSETS.ui.mainMenuFlag} alt="" aria-hidden="true" />
          <span className={styles.attackLabel}>Attack</span>
        </button>
      ) : null}
    </section>
  )
}
