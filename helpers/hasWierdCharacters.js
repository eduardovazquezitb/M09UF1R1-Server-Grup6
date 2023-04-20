import { weirdCharactersRegex } from './removeWeirdCharacters.js'

export function hasWeirdCharacters (string) {
  return string.match(weirdCharactersRegex).length > 0
}
