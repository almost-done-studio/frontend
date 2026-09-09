import { useNavigate } from 'react-router-dom'
import { ASSETS } from '../constants/ASSETS'
import { MAIN_MENU_UI } from '../constants/MAIN_MENU_UI'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import styles from './MainMenuScreen.module.css'

export function MainMenuScreen() {
  const navigate = useNavigate()

  return (
    <section className={styles.screen} aria-labelledby="main-menu-title">
      <div
        className={styles.backdrop}
        style={{ backgroundImage: `url(${ASSETS.ui.mainMenuBg})` }}
        aria-hidden="true"
      />

      <div className={styles.content}>
        <h1 id="main-menu-title" className={styles.title}>
          {MAIN_MENU_UI.titleLines.map((line) => (
            <span key={line} className={styles.titleLine}>
              {line}
            </span>
          ))}
        </h1>

        <nav className={styles.actions} aria-label="Main menu">
          <button
            type="button"
            className={styles.menuButton}
            onClick={() => void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])}
          >
            <img
              src={ASSETS.ui.mainMenuFlag}
              alt=""
              aria-hidden="true"
            />
            <span className={styles.menuLabel}>{MAIN_MENU_UI.playLabel}</span>
          </button>

          <button
            type="button"
            className={styles.menuButton}
            onClick={() => void navigate(SCREEN_PATHS[SCREENS.SETTINGS])}
          >
            <img
              src={ASSETS.ui.mainMenuFlag}
              alt=""
              aria-hidden="true"
            />
            <span className={styles.menuLabel}>{MAIN_MENU_UI.settingsLabel}</span>
          </button>
        </nav>
      </div>
    </section>
  )
}
