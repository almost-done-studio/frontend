import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { LOCATIONS } from '../constants/LOCATIONS'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { UI } from '../constants/UI'
import { useGameStore } from '../store/useGameStore'
import { ArrowButton } from './chrome'
import styles from './page.module.css'

const OPEN_INDEX = 0

export function MapScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const selectLocation = useGameStore((s) => s.selectLocation)
  const [focusedIndex, setFocusedIndex] = useState(OPEN_INDEX)

  const handleSelect = (index: number) => {
    if (index !== OPEN_INDEX) return
    if (!characterId) {
      void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])
      return
    }
    selectLocation(LOCATIONS[index].id)
    void navigate(SCREEN_PATHS[SCREENS.GAME])
  }

  const moveFocus = (delta: number) => {
    setFocusedIndex((current) => (current + delta + LOCATIONS.length) % LOCATIONS.length)
  }

  return (
    <section className={`${styles.page} ${styles.mapBoard}`} aria-labelledby="map-title">
      <h1 id="map-title" className={styles.mapTitle}>
        {UI.mapTitle}
      </h1>
      <div className={styles.mapRow}>
        <ArrowButton
          direction="previous"
          label={UI.previousLeaf}
          onClick={() => moveFocus(-1)}
        />
        <ul className={styles.mapCards}>
          {LOCATIONS.map((location, index) => {
            const locked = index !== OPEN_INDEX
            const label = locked ? '???' : location.name
            return (
              <li key={location.id} className={styles.mapCard}>
                <img className={styles.mapIcon} src={location.cardSrc} alt="" />
                <p className={styles.mapName}>{label}</p>
                <button
                  type="button"
                  className={`${styles.mapSelect} ${focusedIndex === index ? styles.mapSelectFocused : ''}`}
                  onClick={() => handleSelect(index)}
                  aria-disabled={locked}
                  aria-label={locked ? UI.closedBlurb : `${UI.selectLabel} ${location.name}`}
                >
                  <img src={ASSETS.ui.characterSelect.selectButton} alt="" />
                </button>
              </li>
            )
          })}
        </ul>
        <ArrowButton direction="next" label={UI.nextLeaf} onClick={() => moveFocus(1)} />
      </div>
      <button
        type="button"
        className={styles.back}
        onClick={() => void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])}
      >
        <img src={ASSETS.ui.characterSelect.arrowLeft} alt="" />
        <span>{UI.returnLabel}</span>
      </button>
    </section>
  )
}
