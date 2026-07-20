import { Navigate, useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { getCharacter } from '../constants/CHARACTERS'
import { LOCATIONS } from '../constants/LOCATIONS'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { useGameStore } from '../store/useGameStore'
import styles from './MapScreen.module.css'

export function MapScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const selectLocation = useGameStore((s) => s.selectLocation)

  if (!characterId) {
    return <Navigate to={SCREEN_PATHS[SCREENS.CHARACTER_SELECT]} replace />
  }

  const character = getCharacter(characterId)

  return (
    <section className={styles.screen} aria-labelledby="map-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <header className={styles.header}>
        <button
          type="button"
          className={styles.back}
          onClick={() => void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])}
        >
          <img
            className={styles.backIcon}
            src={ASSETS.ui.arrowLeft}
            alt=""
            aria-hidden="true"
          />
          <span>Back</span>
        </button>
        <h1 id="map-title" className={styles.title}>
          Choose a leaf
        </h1>
        <p className={styles.subtitle}>
          Traveling as <strong>{character.name}</strong>
        </p>
      </header>

      <ul className={styles.list}>
        {LOCATIONS.map((location) => (
          <li key={location.id}>
            <button
              type="button"
              className={styles.card}
              onClick={() => {
                selectLocation(location.id)
                void navigate(SCREEN_PATHS[SCREENS.GAME])
              }}
            >
              <span className={styles.cardArt} aria-hidden="true" />
              <span className={styles.cardCopy}>
                <span className={styles.name}>{location.name}</span>
                <span className={styles.blurb}>{location.blurb}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
