export const THEME = {
  colors: {
    bgPage: '#0e0a07',
    bgScene: '#1a120b',
    bgCardTop: '#2a1f14',
    bgCardBottom: '#1a120b',
    bgCardActive: '#241910',
    bgButton: '#120c08',
    textPrimary: '#e8dcc8',
    textSecondary: '#a89070',
    border: '#3d2e1f',
    borderActive: '#c4a35a',
    swatchBorder: '#5a4632',
  },
  fonts: {
    body: "'Modern Antiqua Book', Georgia, 'Times New Roman', serif",
    display: "'Orotund Heavy', Georgia, 'Times New Roman', serif",
  },
} as const

export type ThemeColor = (typeof THEME.colors)[keyof typeof THEME.colors]
