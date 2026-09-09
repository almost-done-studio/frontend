import { Navigate, useNavigate } from 'react-router-dom'
import { getCharacter } from '../constants/CHARACTERS'
import { getLocation } from '../constants/LOCATIONS'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { useGameStore } from '../store/useGameStore'
import { GameHost } from './GameHost'
import styles from './GameScreen.module.css'

export function GameScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const locationId = useGameStore((s) => s.selectedLocationId)
  const activeScene = useGameStore((s) => s.activeScene)

  if (!characterId) {
    return <Navigate to={SCREEN_PATHS[SCREENS.MAIN]} replace />
  }

  if (!locationId) {
    return <Navigate to={SCREEN_PATHS[SCREENS.MAP]} replace />
  }

  const character = getCharacter(characterId)
  const location = getLocation(locationId)

  return (
    <section className={styles.screen} aria-labelledby="game-title">
      <header className={styles.hud}>
        <button
          type="button"
          className={styles.back}
          onClick={() => void navigate(SCREEN_PATHS[SCREENS.MAP])}
        >
          Map
        </button>
        <div className={styles.meta}>
          <h1 id="game-title" className={styles.title}>
            {location.name}
          </h1>
          <p className={styles.subtitle}>
            {character.name}
            {activeScene ? ` · ${activeScene}` : ''}
          </p>
        </div>
      </header>
      <div className={styles.stage}>
        <GameHost characterId={characterId} locationId={locationId} />
      </div>
    </section>
  )
}
