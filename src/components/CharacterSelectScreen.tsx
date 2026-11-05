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

const roster = CHARACTERS.filter(
  (character): character is (typeof CHARACTERS)[number] & { portraitSrc: string } =>
    character.portraitSrc !== null,
)

export function CharacterSelectScreen() {
  const navigate = useNavigate()
  const selectCharacter = useGameStore((s) => s.selectCharacter)
  const [index, setIndex] = useState(0)

  const character = roster[index] ?? roster[0]
  const chrome = ASSETS.ui.characterSelect
  const hasNeighbors = roster.length > 1

  const goPrev = () => {
    setIndex((current) => (current - 1 + roster.length) % roster.length)
  }

  const goNext = () => {
    setIndex((current) => (current + 1) % roster.length)
  }

  if (!character) return null

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
        {hasNeighbors ? (
          <button
            type="button"
            className={styles.arrow}
            onClick={goPrev}
            aria-label="Previous character"
          >
            <img src={chrome.arrowLeft} alt="" aria-hidden="true" />
          </button>
        ) : null}

        <div
          className={styles.portraitStage}
          data-character={character.id}
          aria-live="polite"
        >
          <div className={styles.portraitBacking} aria-hidden="true" />
          <img
            className={styles.portrait}
            src={character.portraitSrc}
            alt=""
            aria-hidden="true"
          />
          <img
            className={styles.portraitFrame}
            src={chrome.portraitFrame}
            alt=""
            aria-hidden="true"
          />
        </div>

        {hasNeighbors ? (
          <button
            type="button"
            className={styles.arrow}
            onClick={goNext}
            aria-label="Next character"
          >
            <img src={chrome.arrowRight} alt="" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      <div className={styles.identity}>
        <p className={styles.name}>{characterDisplayName(character.name)}</p>
        <p className={styles.blurb}>{character.blurb}</p>
      </div>

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
