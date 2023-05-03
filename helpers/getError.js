export const getError = (error) => {
  return new Error(`Error ${error.error}: ${error.message}`)
}
