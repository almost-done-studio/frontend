/** Main menu — copy & layout tokens. */
export const MAIN_MENU_UI = {
  titleLines: ['Marginalia:', 'The Quest'] as const,
  titleFontSizePx: 120,
  playLabel: 'Play',
  settingsLabel: 'Settings',
  settingsTitle: 'Settings',
  settingsPlaceholder: 'Coming soon.',
  backLabel: 'Back',
  menuButtonMinHeightPx: 56,
  menuButtonWidthPx: 200,
} as const

export type MainMenuUi = typeof MAIN_MENU_UI
