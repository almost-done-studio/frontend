import { Navigate, Route, Routes } from 'react-router-dom'
import { SCREEN_PATHS, SCREENS } from './constants/SCREENS'
import { CharacterSelectScreen } from './components/CharacterSelectScreen'
import { MapScreen } from './components/MapScreen'
import { GameScreen } from './components/GameScreen'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.shell}>
      <header className={styles.brandBar}>
        <p className={styles.brand}>AlmostDone</p>
      </header>
      <main className={styles.stage}>
        <Routes>
          <Route
            path={SCREEN_PATHS[SCREENS.CHARACTER_SELECT]}
            element={<CharacterSelectScreen />}
          />
          <Route path={SCREEN_PATHS[SCREENS.MAP]} element={<MapScreen />} />
          <Route path={SCREEN_PATHS[SCREENS.GAME]} element={<GameScreen />} />
          <Route
            path="*"
            element={
              <Navigate to={SCREEN_PATHS[SCREENS.CHARACTER_SELECT]} replace />
            }
          />
        </Routes>
      </main>
    </div>
  )
}
