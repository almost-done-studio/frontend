import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CHARACTERS } from '../constants/CHARACTERS'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { folioName, UI } from '../constants/UI'
import { useGameStore } from '../store/useGameStore'
import { ArrowButton, FolioScreen, Portrait, Ribbon } from './chrome'
import styles from './page.module.css'

const roster = CHARACTERS.filter(
  (character): character is (typeof CHARACTERS)[number] & { portraitSrc: string } =>
    character.portraitSrc !== null,
)

export function CharacterScreen() {
  const navigate = useNavigate()
  const selectCharacter = useGameStore((s) => s.selectCharacter)
  const [index, setIndex] = useState(0)
  const character = roster[index] ?? roster[0]
  const hasNeighbors = roster.length > 1

  if (!character) return null

  const name = folioName(character.name)

  const onSelect = () => {
    selectCharacter(character.id)
    void navigate(SCREEN_PATHS[SCREENS.MAP])
  }

  return (
    <FolioScreen
      titleId="character-title"
      onReturn={() => void navigate(SCREEN_PATHS[SCREENS.MAIN])}
      ornament={
        <div className={styles.carousel}>
          {hasNeighbors ? (
            <ArrowButton
              direction="previous"
              label={UI.previousCompanion}
              onClick={() => setIndex((current) => (current - 1 + roster.length) % roster.length)}
            />
          ) : null}
          <Portrait src={character.portraitSrc} fit="bust" />
          {hasNeighbors ? (
            <ArrowButton
              direction="next"
              label={UI.nextCompanion}
              onClick={() => setIndex((current) => (current + 1) % roster.length)}
            />
          ) : null}
        </div>
      }
    >
      <h1 id="character-title" className={styles.kicker}>
        {UI.characterTitle}
      </h1>
      <p className={styles.name}>{name}</p>
      <p className={styles.blurb}>{character.blurb}</p>
      <Ribbon label={UI.enterLabel} onClick={onSelect} ariaLabel={`Enter as ${name}`} />
    </FolioScreen>
  )
}
