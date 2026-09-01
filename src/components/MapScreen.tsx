import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
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
  const [focusedIndex, setFocusedIndex] = useState(0)
  const prev = () => setFocusedIndex((s) => (s - 1 + LOCATIONS.length) % LOCATIONS.length)
  const next = () => setFocusedIndex((s) => (s + 1) % LOCATIONS.length)

  const location = LOCATIONS[focusedIndex]
  const locked = focusedIndex !== 0
  const displayName = locked ? '???' : location.name

  const handleSelect = () => {
    if (locked) return
    if (!characterId) {
      void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])
      return
    }
    selectLocation(location.id)
    void navigate(SCREEN_PATHS[SCREENS.GAME])
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleSelect()
    }
  }

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

      <button type="button" className={`${styles.navButton} ${styles.prev}`} onClick={prev} aria-label="Previous">
        <img src={ASSETS.ui.characterSelect.arrowLeft} alt="Prev" />
      </button>

      <button type="button" className={`${styles.navButton} ${styles.next}`} onClick={next} aria-label="Next">
        <img src={ASSETS.ui.characterSelect.arrowRight} alt="Next" />
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
        <li className={styles.column}>
          <div className={`${styles.card} ${locked ? styles.lockedCard : ''}`}>
            <span
              className={`${styles.thumbStage} ${locked ? styles.locked : ''}`}
              data-location={location.id}
              role={locked ? undefined : 'button'}
              tabIndex={locked ? undefined : 0}
              onClick={locked ? undefined : handleSelect}
              onKeyDown={locked ? undefined : handleKey}
            >
              <img className={styles.thumb} src={location.mapSrc} alt="" />
            </span>
            <span className={styles.name}>{displayName}</span>
            <button
              type="button"
              className={`${styles.select} ${locked ? styles.selectDisabled : ''}`}
              onClick={handleSelect}
              aria-label={locked ? `Locked ${location.name}` : `Select ${location.name}`}
              aria-disabled={locked}
            >
              <img
                src={ASSETS.ui.characterSelect.selectButton}
                alt={locked ? 'Locked' : 'Select'}
                aria-hidden={locked}
              />
            </button>
          </div>
        </li>
      </ul>
    </section>
  )
}
