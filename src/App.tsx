import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { SCREEN_PATHS, SCREENS } from './constants/SCREENS'
import { CharacterSelectScreen } from './components/CharacterSelectScreen'
import { MainMenuScreen } from './components/MainMenuScreen'
import { MapScreen } from './components/MapScreen'
import { GameScreen } from './components/GameScreen'
import { SettingsScreen } from './components/SettingsScreen'
import styles from './App.module.css'

export default function App() {
  const location = useLocation()
  const isGameRoute = location.pathname === SCREEN_PATHS[SCREENS.GAME]
  const isMainRoute = location.pathname === SCREEN_PATHS[SCREENS.MAIN]
  const isCharacterSelectRoute =
    location.pathname === SCREEN_PATHS[SCREENS.CHARACTER_SELECT]
  const isMapRoute = location.pathname === SCREEN_PATHS[SCREENS.MAP]
  const isSettingsRoute = location.pathname === SCREEN_PATHS[SCREENS.SETTINGS]
  const hideBrandBar =
    isGameRoute ||
    isMainRoute ||
    isCharacterSelectRoute ||
    isMapRoute ||
    isSettingsRoute

  return (
    <div
      className={styles.shell}
      data-game-route={isGameRoute ? 'true' : 'false'}
      data-hide-brand={hideBrandBar ? 'true' : 'false'}
    >
      <header className={styles.brandBar}>
        <p className={styles.brand}>AlmostDone</p>
      </header>
      <main className={styles.stage}>
        <Routes>
          <Route path={SCREEN_PATHS[SCREENS.MAIN]} element={<MainMenuScreen />} />
          <Route
            path={SCREEN_PATHS[SCREENS.CHARACTER_SELECT]}
            element={<CharacterSelectScreen />}
          />
          <Route path={SCREEN_PATHS[SCREENS.MAP]} element={<MapScreen />} />
          <Route
            path="/v2"
            element={<Navigate to={SCREEN_PATHS[SCREENS.MAP]} replace />}
          />
          <Route path={SCREEN_PATHS[SCREENS.GAME]} element={<GameScreen />} />
          <Route
            path={SCREEN_PATHS[SCREENS.SETTINGS]}
            element={<SettingsScreen />}
          />
          <Route
            path="*"
            element={<Navigate to={SCREEN_PATHS[SCREENS.MAIN]} replace />}
          />
        </Routes>
      </main>
    </div>
  )
}
