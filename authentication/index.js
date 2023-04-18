import fs from 'fs'

import { AuthData } from './model.js'

export function authenticate (params) {
  // check if params has the correct json structure

  const authData = new AuthData(params.mail, params.password)

  // check if data file contains user
  fs.readFile('./authentication/data.json', (err, file) => {
    if (err) return console.error(err)
    const data = JSON.parse(file)
    data.forEach(user => {
      if (authData.Equals(user)) { return true }
    }
    )
  })

  return false
}
