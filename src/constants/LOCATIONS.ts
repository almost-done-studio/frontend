import { ASSETS } from './ASSETS'

export const LOCATIONS = [
  {
    id: 'scriptorium',
    name: 'Scriptorium',
    blurb: 'Warm lamps, unfinished pages.',
    accent: '#7a1f1f',
    thumbSrc: ASSETS.ui.mapThumbs.scriptorium,
  },
  {
    id: 'forest',
    name: 'Forest Margin',
    blurb: 'Twisting vines along the leaf.',
    accent: '#3d5c3a',
    thumbSrc: ASSETS.ui.mapThumbs.forest,
  },
  {
    id: 'cloister',
    name: 'Cloister Walk',
    blurb: 'Stone arches and quiet steps.',
    accent: '#4a5568',
    thumbSrc: ASSETS.ui.mapThumbs.cloister,
  },
] as const

export type LocationId = (typeof LOCATIONS)[number]['id']

export function getLocation(id: LocationId) {
  const location = LOCATIONS.find((l) => l.id === id)
  if (!location) {
    throw new Error(`Unknown location: ${id}`)
  }
  return location
}
