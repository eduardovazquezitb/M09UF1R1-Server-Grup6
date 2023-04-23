import { weirdCharactersRegex } from './removeWeirdCharacters.js'

export function hasWeirdCharacters (string) {
  return string.matchAll(weirdCharactersRegex).length > 0
}
