export const SCENES = {
  BOOT: 'BootScene',
} as const

export type SceneKey = (typeof SCENES)[keyof typeof SCENES]
