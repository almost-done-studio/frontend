import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { LOCATIONS } from '../constants/LOCATIONS'
import { V2_UI } from '../constants/V2_UI'
import { useGameStore } from '../store/useGameStore'
import { ArrowButton } from './chrome'
import { V2_PATHS } from './paths'
import styles from './page.module.css'

const OPEN_INDEX = 0

export function V2MapScreen() {
  const navigate = useNavigate()
  const characterId = useGameStore((s) => s.selectedCharacterId)
  const selectLocation = useGameStore((s) => s.selectLocation)
  const [focusedIndex, setFocusedIndex] = useState(OPEN_INDEX)

  const handleSelect = (index: number) => {
    if (index !== OPEN_INDEX) return
    if (!characterId) {
      void navigate(V2_PATHS.character)
      return
    }
    selectLocation(LOCATIONS[index].id)
    void navigate(V2_PATHS.game)
  }

  const moveFocus = (delta: number) => {
    setFocusedIndex((current) => (current + delta + LOCATIONS.length) % LOCATIONS.length)
  }

  return (
    <section className={`${styles.page} ${styles.mapBoard}`} aria-labelledby="map-title">
      <h1 id="map-title" className={styles.mapTitle}>
        {V2_UI.mapTitle}
      </h1>
      <div className={styles.mapRow}>
        <ArrowButton
          direction="previous"
          label={V2_UI.previousLeaf}
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
                  aria-label={locked ? V2_UI.closedBlurb : `${V2_UI.selectLabel} ${location.name}`}
                >
                  <img src={ASSETS.ui.characterSelect.selectButton} alt="" />
                </button>
              </li>
            )
          })}
        </ul>
        <ArrowButton
          direction="next"
          label={V2_UI.nextLeaf}
          onClick={() => moveFocus(1)}
        />
      </div>
      <button
        type="button"
        className={styles.back}
        onClick={() => void navigate(V2_PATHS.character)}
      >
        <img src={ASSETS.ui.characterSelect.arrowLeft} alt="" />
        <span>{V2_UI.returnLabel}</span>
      </button>
    </section>
  )
}
