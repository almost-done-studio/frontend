import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { MAIN_MENU_UI } from '../constants/MAIN_MENU_UI'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import styles from './SettingsScreen.module.css'

export function SettingsScreen() {
  const navigate = useNavigate()

  return (
    <section className={styles.screen} aria-labelledby="settings-title">
      <div className={styles.backdrop} aria-hidden="true" />

      <button
        type="button"
        className={styles.back}
        onClick={() => void navigate(SCREEN_PATHS[SCREENS.MAIN])}
        aria-label={MAIN_MENU_UI.backLabel}
      >
        <img
          className={styles.backIcon}
          src={ASSETS.ui.characterSelect.arrowLeft}
          alt=""
          aria-hidden="true"
        />
        <span className={styles.backLabel}>{MAIN_MENU_UI.backLabel}</span>
      </button>

      <header className={styles.header}>
        <h1 id="settings-title" className={styles.title}>
          {MAIN_MENU_UI.settingsTitle}
        </h1>
        <p className={styles.placeholder}>{MAIN_MENU_UI.settingsPlaceholder}</p>
      </header>
    </section>
  )
}
