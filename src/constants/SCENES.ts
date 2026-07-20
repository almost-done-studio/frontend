export const SCENES = {
  WORLD: 'WorldScene',
} as const

export type SceneKey = (typeof SCENES)[keyof typeof SCENES]
