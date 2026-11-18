import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { RouteCurtain } from './components/RouteCurtain'
import { SCREEN_PATHS, SCREENS } from './constants/SCREENS'
import { CharacterScreen } from './screens/CharacterScreen'
import { GameScreen } from './screens/GameScreen'
import { MapScreen } from './screens/MapScreen'
import { MenuScreen } from './screens/MenuScreen'
import { SettingsScreen } from './screens/SettingsScreen'
import styles from './App.module.css'

export default function App() {
  const { pathname } = useLocation()
  const isGameRoute = pathname === SCREEN_PATHS[SCREENS.GAME]

  return (
    <div
      className={styles.shell}
      data-game-route={isGameRoute ? 'true' : 'false'}
      data-hide-brand="true"
    >
      <header className={styles.brandBar}>
        <p className={styles.brand}>AlmostDone</p>
      </header>
      <main className={styles.stage}>
        <Routes>
          <Route path={SCREEN_PATHS[SCREENS.MAIN]} element={<MenuScreen />} />
          <Route path={SCREEN_PATHS[SCREENS.CHARACTER_SELECT]} element={<CharacterScreen />} />
          <Route path={SCREEN_PATHS[SCREENS.MAP]} element={<MapScreen />} />
          <Route path={SCREEN_PATHS[SCREENS.GAME]} element={<GameScreen />} />
          <Route path={SCREEN_PATHS[SCREENS.SETTINGS]} element={<SettingsScreen />} />
          <Route path="*" element={<Navigate to={SCREEN_PATHS[SCREENS.MAIN]} replace />} />
        </Routes>
        <RouteCurtain />
      </main>
    </div>
  )
}
