export const weirdCharactersRegex = /[^a-z0-9|^.|^@|^!|^_]/gi

export function removeWeirdCharacters (string) {
  return string.replace(weirdCharactersRegex, '')
}
