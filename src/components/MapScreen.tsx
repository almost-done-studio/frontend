import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { getCharacter } from '../constants/CHARACTERS'
import { LOCATIONS } from '../constants/LOCATIONS'
import { MAP_UI } from '../constants/MAP_UI'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { useGameStore } from '../store/useGameStore'
import styles from './MapScreen.module.css'

export function MapScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const selectLocation = useGameStore((s) => s.selectLocation)
  const character = characterId ? getCharacter(characterId) : null

  return (
    <section className={styles.screen} aria-labelledby="map-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <button
        type="button"
        className={styles.back}
        onClick={() => void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])}
        aria-label={MAP_UI.backLabel}
      >
        <img
          className={styles.backIcon}
          src={ASSETS.ui.characterSelect.arrowLeft}
          alt=""
          aria-hidden="true"
        />
      </button>

      <header className={styles.header}>
        <h1 id="map-title" className={styles.title}>
          {MAP_UI.title}
        </h1>
        <p className={styles.subtitle}>
          {character ? (
            <>
              {MAP_UI.subtitlePrefix} {character.name}
            </>
          ) : (
            MAP_UI.subtitleFallback
          )}
        </p>
      </header>

      <ul className={styles.columns}>
        {LOCATIONS.map((location) => (
          <li key={location.id} className={styles.column}>
            <div className={styles.card}>
              <span
                className={styles.thumbStage}
                data-location={location.id}
                aria-hidden="true"
              >
                <span className={styles.thumbBacking} />
                <img className={styles.thumb} src={location.thumbSrc} alt="" />
                <img
                  className={styles.thumbFrame}
                  src={ASSETS.ui.characterSelect.portraitFrame}
                  alt=""
                />
              </span>
              <span className={styles.name}>{location.name}</span>
              <span className={styles.blurb}>{location.blurb}</span>
              <button
                type="button"
                className={styles.select}
                onClick={() => {
                  if (!characterId) {
                    void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])
                    return
                  }
                  selectLocation(location.id)
                  void navigate(SCREEN_PATHS[SCREENS.GAME])
                }}
                aria-label={`Select ${location.name}`}
              >
                <img
                  src={ASSETS.ui.characterSelect.selectButton}
                  alt=""
                  aria-hidden="true"
                />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
