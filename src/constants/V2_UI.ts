import { MAIN_MENU_UI } from './MAIN_MENU_UI'

/** Copy for the live folio. One voice across menu, choice, and the world. */
export const V2_UI = {
  titleLines: MAIN_MENU_UI.titleLines,
  beginLabel: 'Begin',
  settingsLabel: 'Settings',
  settingsTitle: 'Settings',
  settingsBody: 'Sound and letters will be ruled on this leaf.',
  characterTitle: 'Choose a companion',
  mapTitle: 'Choose Your Map',
  selectLabel: 'Select',
  enterLabel: 'Enter',
  returnLabel: 'Return',
  strikeLabel: 'Strike',
  closedName: 'Unwritten',
  closedBlurb: 'This page is still closed.',
  previousCompanion: 'Previous companion',
  nextCompanion: 'Next companion',
  previousLeaf: 'Previous leaf',
  nextLeaf: 'Next leaf',
} as const

export function folioName(name: string): string {
  if (name.startsWith('The ') || name.startsWith('Margin')) return name
  return `The ${name}`
}
