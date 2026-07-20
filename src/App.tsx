import { GameHost } from './components/GameHost'
import { useGameStore } from './store/useGameStore'
import styles from './App.module.css'

export default function App() {
  const activeScene = useGameStore((s) => s.activeScene)

  return (
    <div className={styles.shell}>
      <header className={styles.hud} aria-live="polite">
        <p className={styles.brand}>AlmostDone</p>
        <p className={styles.scene}>
          {activeScene ? `Scene: ${activeScene}` : 'Loading…'}
        </p>
      </header>
      <main className={styles.stage}>
        <GameHost />
      </main>
    </div>
  )
}
