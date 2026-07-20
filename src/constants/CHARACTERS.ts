export const CHARACTERS = [
  {
    id: 'monk',
    name: 'Monk',
    blurb: 'Quiet scribe of the margins.',
    accent: '#c4a35a',
  },
  {
    id: 'pilgrim',
    name: 'Pilgrim',
    blurb: 'Walks every illuminated path.',
    accent: '#7a9e7e',
  },
  {
    id: 'herald',
    name: 'Herald',
    blurb: 'Carries news between folios.',
    accent: '#8b6b4a',
  },
  {
    id: 'scribe',
    name: 'Scribe',
    blurb: 'Ink-stained keeper of lore.',
    accent: '#6b7c9c',
  },
  {
    id: 'beast',
    name: 'Margin Beast',
    blurb: 'Curious creature of the border.',
    accent: '#9c5a5a',
  },
] as const

export type CharacterId = (typeof CHARACTERS)[number]['id']

export function getCharacter(id: CharacterId) {
  const character = CHARACTERS.find((c) => c.id === id)
  if (!character) {
    throw new Error(`Unknown character: ${id}`)
  }
  return character
}
