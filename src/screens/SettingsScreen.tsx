import { useNavigate } from 'react-router-dom'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { UI } from '../constants/UI'
import { FolioScreen } from './chrome'
import styles from './page.module.css'

export function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <FolioScreen titleId="settings-title" onReturn={() => void navigate(SCREEN_PATHS[SCREENS.MAIN])}>
      <h1 id="settings-title" className={styles.heading}>
        {UI.settingsTitle}
      </h1>
      <p className={`${styles.blurb} ${styles.lede}`}>{UI.settingsBody}</p>
    </FolioScreen>
  )
}
