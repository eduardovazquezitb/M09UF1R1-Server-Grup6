import fs from 'fs'

import AuthData from './model/AuthData.js'

export function authenticate (params) {
  // check if params has the correct json structure

  const authData = new AuthData(params.mail, params.password)

  // check if data file contains user
  try {
    const file = fs.readFileSync('./authentication/data.json')

    const database = JSON.parse(file)
    return database.some(user =>
      authData.Equals(user)
    )
  } catch (error) {
    console.error(error)
    return false
  }
}
