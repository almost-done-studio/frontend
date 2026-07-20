export const LOCATIONS = [
  {
    id: 'scriptorium',
    name: 'Scriptorium',
    blurb: 'Warm lamps, unfinished pages.',
  },
  {
    id: 'forest',
    name: 'Forest Margin',
    blurb: 'Twisting vines along the leaf.',
  },
  {
    id: 'cloister',
    name: 'Cloister Walk',
    blurb: 'Stone arches and quiet steps.',
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
