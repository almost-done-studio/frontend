/** World loading overlay — copy & tokens. */
export const LOADING_UI = {
  title: 'Illuminating the page…',
  progressLabel: 'Loading world',
  fadeOutMs: 400,
} as const

export type LoadingUi = typeof LOADING_UI

export function loadingPercent(progress: number): number {
  if (!Number.isFinite(progress)) return 0
  return Math.round(Math.min(1, Math.max(0, progress)) * 100)
}
