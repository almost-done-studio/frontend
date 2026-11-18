import { ASSETS } from './ASSETS'

export const LOCATIONS = [
  {
    id: 'garden',
    name: 'The Garden',
    blurb: 'A ruled page, still open.',
    accent: '#3d5c3a',
    thumbSrc: ASSETS.ui.mapThumbs.garden,
    mapSrc: ASSETS.ui.map.garden,
    cardSrc: ASSETS.ui.mapCards.garden,
  },
  {
    id: 'scriptorium',
    name: 'Scriptorium',
    blurb: 'Warm lamps, unfinished pages.',
    accent: '#7a1f1f',
    thumbSrc: ASSETS.ui.mapThumbs.scriptorium,
    mapSrc: ASSETS.ui.map.scriptorium,
    cardSrc: ASSETS.ui.mapCards.scriptorium,
  },
  
  {
    id: 'cloister',
    name: 'Cloister Walk',
    blurb: 'Stone arches and quiet steps.',
    accent: '#4a5568',
    thumbSrc: ASSETS.ui.mapThumbs.cloister,
    mapSrc: ASSETS.ui.map.cloister,
    cardSrc: ASSETS.ui.mapCards.cloister,
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
