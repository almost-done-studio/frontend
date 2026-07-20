import { useNavigate } from 'react-router-dom'
import { CHARACTERS } from '../constants/CHARACTERS'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { useGameStore } from '../store/useGameStore'
import styles from './CharacterSelectScreen.module.css'

export function CharacterSelectScreen() {
  const navigate = useNavigate()
  const selectCharacter = useGameStore((s) => s.selectCharacter)

  return (
    <section className={styles.screen} aria-labelledby="character-select-title">
      <header className={styles.header}>
        <h1 id="character-select-title" className={styles.title}>
          Choose your figure
        </h1>
        <p className={styles.subtitle}>Five souls from the manuscript edge.</p>
      </header>

      <ul className={styles.list}>
        {CHARACTERS.map((character) => (
          <li key={character.id}>
            <button
              type="button"
              className={styles.card}
              data-character={character.id}
              onClick={() => {
                selectCharacter(character.id)
                void navigate(SCREEN_PATHS[SCREENS.MAP])
              }}
            >
              <span className={styles.swatch} aria-hidden="true" />
              <span className={styles.cardBody}>
                <span className={styles.name}>{character.name}</span>
                <span className={styles.blurb}>{character.blurb}</span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
