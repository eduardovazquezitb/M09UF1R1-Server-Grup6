import { weirdCharactersRegex } from './removeWeirdCharacters.js'

export function hasWeirdCharacters (string) {
  const matches = string.match(weirdCharactersRegex)
  if (matches === null){
    return false
  }
  return true
}
