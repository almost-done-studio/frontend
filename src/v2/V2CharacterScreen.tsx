import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CHARACTERS } from '../constants/CHARACTERS'
import { folioName, V2_UI } from '../constants/V2_UI'
import { useGameStore } from '../store/useGameStore'
import { ArrowButton, FolioScreen, Portrait, Ribbon } from './chrome'
import { V2_PATHS } from './paths'
import styles from './page.module.css'

const roster = CHARACTERS.filter(
  (character): character is (typeof CHARACTERS)[number] & { portraitSrc: string } =>
    character.portraitSrc !== null,
)

export function V2CharacterScreen() {
  const navigate = useNavigate()
  const selectCharacter = useGameStore((s) => s.selectCharacter)
  const [index, setIndex] = useState(0)
  const character = roster[index] ?? roster[0]
  const hasNeighbors = roster.length > 1

  if (!character) return null

  const name = folioName(character.name)

  const onSelect = () => {
    selectCharacter(character.id)
    void navigate(V2_PATHS.map)
  }

  return (
    <FolioScreen
      titleId="v2-character-title"
      onReturn={() => void navigate(V2_PATHS.menu)}
      ornament={
        <div className={styles.carousel}>
          {hasNeighbors ? (
            <ArrowButton
              direction="previous"
              label={V2_UI.previousCompanion}
              onClick={() => setIndex((current) => (current - 1 + roster.length) % roster.length)}
            />
          ) : null}
          <Portrait src={character.portraitSrc} fit="bust" />
          {hasNeighbors ? (
            <ArrowButton
              direction="next"
              label={V2_UI.nextCompanion}
              onClick={() => setIndex((current) => (current + 1) % roster.length)}
            />
          ) : null}
        </div>
      }
    >
      <h1 id="v2-character-title" className={styles.kicker}>
        {V2_UI.characterTitle}
      </h1>
      <p className={styles.name}>{name}</p>
      <p className={styles.blurb}>{character.blurb}</p>
      <Ribbon label={V2_UI.enterLabel} onClick={onSelect} ariaLabel={`Enter as ${name}`} />
    </FolioScreen>
  )
}
