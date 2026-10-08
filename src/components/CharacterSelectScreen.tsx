import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { CHARACTERS } from '../constants/CHARACTERS'
import { CHARACTER_SELECT_UI } from '../constants/CHARACTER_SELECT_UI'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { useGameStore } from '../store/useGameStore'
import styles from './CharacterSelectScreen.module.css'

function characterDisplayName(name: string): string {
  return name.startsWith('The ') ? name : `The ${name}`
}

export function CharacterSelectScreen() {
  const navigate = useNavigate()
  const selectCharacter = useGameStore((s) => s.selectCharacter)
  const [index, setIndex] = useState(0)

  const character = CHARACTERS[index]
  const chrome = ASSETS.ui.characterSelect

  const goPrev = () => {
    setIndex((current) => (current - 1 + CHARACTERS.length) % CHARACTERS.length)
  }

  const goNext = () => {
    setIndex((current) => (current + 1) % CHARACTERS.length)
  }

  const onSelect = () => {
    selectCharacter(character.id)
    void navigate(SCREEN_PATHS[SCREENS.MAP])
  }

  return (
    <section className={styles.screen} aria-labelledby="character-select-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <h1 id="character-select-title" className={styles.title}>
        {CHARACTER_SELECT_UI.title}
      </h1>

      <div className={styles.carousel}>
        <button
          type="button"
          className={styles.arrow}
          onClick={goPrev}
          aria-label="Previous character"
        >
          <img src={chrome.arrowLeft} alt="" aria-hidden="true" />
        </button>

        <div
          className={styles.portraitStage}
          data-character={character.id}
          aria-live="polite"
        >
          <div className={styles.portraitBacking} aria-hidden="true" />
          {character.portraitSrc ? (
            <img
              className={styles.portrait}
              src={character.portraitSrc}
              alt=""
              aria-hidden="true"
            />
          ) : (
            <span className={styles.portraitPlaceholder} aria-hidden="true" />
          )}
          <img
            className={styles.portraitFrame}
            src={chrome.portraitFrame}
            alt=""
            aria-hidden="true"
          />
        </div>

        <button
          type="button"
          className={styles.arrow}
          onClick={goNext}
          aria-label="Next character"
        >
          <img src={chrome.arrowRight} alt="" aria-hidden="true" />
        </button>
      </div>

      <p className={styles.name}>{characterDisplayName(character.name)}</p>

      <button
        type="button"
        className={styles.select}
        onClick={onSelect}
        aria-label={`Select ${characterDisplayName(character.name)}`}
      >
        <img src={chrome.selectButton} alt="" aria-hidden="true" />
      </button>
    </section>
  )
}
