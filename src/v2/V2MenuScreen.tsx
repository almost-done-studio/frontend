import { useNavigate } from 'react-router-dom'
import { V2_UI } from '../constants/V2_UI'
import { Ribbon } from './chrome'
import { V2_PATHS } from './paths'
import styles from './page.module.css'

export function V2MenuScreen() {
  const navigate = useNavigate()

  return (
    <section className={`${styles.page} ${styles.menuArt}`} aria-labelledby="v2-menu-title">
      <div className={styles.cover}>
        <div className={styles.coverCluster}>
          <h1 id="v2-menu-title" className={styles.coverTitle}>
            {V2_UI.titleLines.map((line) => (
              <span key={line} className={styles.coverLine}>
                {line}
              </span>
            ))}
          </h1>
          <Ribbon label={V2_UI.beginLabel} onClick={() => void navigate(V2_PATHS.character)} />
          <Ribbon
            label={V2_UI.settingsLabel}
            onClick={() => void navigate(V2_PATHS.settings)}
          />
        </div>
      </div>
    </section>
  )
}
