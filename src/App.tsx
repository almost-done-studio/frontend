import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { RouteCurtain } from './components/RouteCurtain'
import { V2CharacterScreen } from './v2/V2CharacterScreen'
import { V2GameScreen } from './v2/V2GameScreen'
import { V2MapScreen } from './v2/V2MapScreen'
import { V2MenuScreen } from './v2/V2MenuScreen'
import { V2SettingsScreen } from './v2/V2SettingsScreen'
import { V2_PATHS } from './v2/paths'
import styles from './App.module.css'

function LegacyV2Redirect() {
  const { pathname } = useLocation()
  const next = pathname.replace(/^\/v2\/?/, '/')
  return <Navigate to={next === '/' ? V2_PATHS.menu : next} replace />
}

export default function App() {
  const { pathname } = useLocation()
  const isGameRoute = pathname === V2_PATHS.game

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
          <Route path={V2_PATHS.menu} element={<V2MenuScreen />} />
          <Route path={V2_PATHS.character} element={<V2CharacterScreen />} />
          <Route path={V2_PATHS.map} element={<V2MapScreen />} />
          <Route path={V2_PATHS.game} element={<V2GameScreen />} />
          <Route path={V2_PATHS.settings} element={<V2SettingsScreen />} />
          <Route path="/v2" element={<LegacyV2Redirect />} />
          <Route path="/v2/*" element={<LegacyV2Redirect />} />
          <Route path="*" element={<Navigate to={V2_PATHS.menu} replace />} />
        </Routes>
        <RouteCurtain />
      </main>
    </div>
  )
}
