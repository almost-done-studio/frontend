import { ASSETS } from './ASSETS'

export const LOCATIONS = [
  {
    id: 'garden',
    name: 'Garden',
    blurb: 'Twisting vines along the leaf.',
    accent: '#3d5c3a',
    thumbSrc: ASSETS.ui.mapThumbs.garden,
    mapSrc: ASSETS.ui.map.garden,
  },
  {
    id: 'scriptorium',
    name: 'Scriptorium',
    blurb: 'Warm lamps, unfinished pages.',
    accent: '#7a1f1f',
    thumbSrc: ASSETS.ui.mapThumbs.scriptorium,
    mapSrc: ASSETS.ui.map.scriptorium,
  },
  
  {
    id: 'cloister',
    name: 'Cloister Walk',
    blurb: 'Stone arches and quiet steps.',
    accent: '#4a5568',
    thumbSrc: ASSETS.ui.mapThumbs.cloister,
    mapSrc: ASSETS.ui.map.cloister,
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
