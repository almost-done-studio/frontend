import { useNavigate } from 'react-router-dom'
import { V2_UI } from '../constants/V2_UI'
import { FolioScreen } from './chrome'
import { V2_PATHS } from './paths'
import styles from './page.module.css'

export function V2SettingsScreen() {
  const navigate = useNavigate()

  return (
    <FolioScreen titleId="v2-settings-title" onReturn={() => void navigate(V2_PATHS.menu)}>
      <h1 id="v2-settings-title" className={styles.heading}>
        {V2_UI.settingsTitle}
      </h1>
      <p className={`${styles.blurb} ${styles.lede}`}>{V2_UI.settingsBody}</p>
    </FolioScreen>
  )
}
