import { useNavigate } from 'react-router-dom'
import { SCREEN_PATHS, SCREENS } from '../constants/SCREENS'
import { UI } from '../constants/UI'
import { Ribbon } from './chrome'
import styles from './page.module.css'

export function MenuScreen() {
  const navigate = useNavigate()

  return (
    <section className={`${styles.page} ${styles.menuArt}`} aria-labelledby="menu-title">
      <div className={styles.cover}>
        <div className={styles.coverCluster}>
          <h1 id="menu-title" className={styles.coverTitle}>
            {UI.titleLines.map((line) => (
              <span key={line} className={styles.coverLine}>
                {line}
              </span>
            ))}
          </h1>
          <Ribbon
            label={UI.beginLabel}
            onClick={() => void navigate(SCREEN_PATHS[SCREENS.CHARACTER_SELECT])}
          />
          <Ribbon
            label={UI.settingsLabel}
            onClick={() => void navigate(SCREEN_PATHS[SCREENS.SETTINGS])}
          />
        </div>
      </div>
    </section>
  )
}
