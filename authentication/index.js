import fs from 'fs'

import { hasWeirdCharacters, removeWeirdCharacters } from '../helpers/index.js'
import { AuthDataDto, GetUserRequestDto, CredentialsDto, UpdateUsernameDto } from './model/index.js'
import { createNewPosition } from '../ranking/index.js'

const InvalidQuery = { status: false, error: 422, message: 'Invalid Query Parameters' }
const MailIsTaken = { status: false, error: 422, message: 'Mail Is Taken' }
const MailDoesNotExist = { status: false, error: 422, message: 'Mail Does Not Exist' }
const InvalidCredentials = { status: false, error: 422, message: 'Invalid Credentials' }
const SomethingWentWrong = { status: false, error: 500, message: 'Internal Error' }

const dataPath = './authentication/data.json'

export function authenticate (params) {
  // check if params has the correct json structure
  if (!AuthDataDto.typeOf(params)) {
    return InvalidQuery
  }

  const authData = new AuthDataDto(params)

  // check if data file contains user
  try {
    const file = fs.readFileSync(dataPath)

    const database = JSON.parse(file)
    const result = database.filter(user =>
      authData.Equals(user)
    )

    const isUser = result.length > 0
    let username = null
    if (isUser) { username = result[0].username }

    return { status: true, data: { isUser, username } }
  } catch (error) {
    console.error(error)
    return SomethingWentWrong
  }
}

export function getUserData (params) {
  // check if params has the correct json structure
  if (!GetUserRequestDto.typeOf(params)) {
    return InvalidQuery
  }

  const getUserRequestDto = new GetUserRequestDto(params)

  // check if data file contains user
  try {
    const file = fs.readFileSync(dataPath)

    const database = JSON.parse(file)
    const result = database.filter(user =>
      user.mail === getUserRequestDto.mail
    )
    if (result.length > 0) {
      return { status: true, data: result[0] }
    }
    return MailDoesNotExist
  } catch (error) {
    console.error(error)
    return SomethingWentWrong
  }
}

export function getAllUsersData () {
  try {
    const file = fs.readFileSync(dataPath)

    const database = JSON.parse(file)
    return { status: true, data: database }
  } catch (error) {
    console.error(error)
    return SomethingWentWrong
  }
}

export function createNewUser (params) {
  // check if params has the correct json structure
  if (!CredentialsDto.typeOf(params)) {
    return InvalidQuery
  }

  const credentialsDto = new CredentialsDto(params)

  try {
    const file = fs.readFileSync(dataPath)
    const database = JSON.parse(file)
    if (database.some(user => user.mail === credentialsDto.mail)) {
      return MailIsTaken
    }
    if (hasWeirdCharacters(credentialsDto.password) || hasWeirdCharacters(credentialsDto.mail)) {
      return InvalidCredentials
    }
    credentialsDto.username = removeWeirdCharacters(credentialsDto.username)
    database.push(credentialsDto)
    fs.writeFileSync(dataPath, JSON.stringify(database))
    const position =
    {
      mail: credentialsDto.mail,
      score: 0
    }
    createNewPosition(position)
    return { status: true, data: { newusername: credentialsDto.username } }
  } catch (error) {
    return SomethingWentWrong
  }
}

export function updateUsername (params) {
  // check if params has the correct json structure
  if (!UpdateUsernameDto.typeOf(params)) {
    return InvalidQuery
  }

  const queryParams = new UpdateUsernameDto(params)

  try {
    const file = fs.readFileSync(dataPath)
    const database = JSON.parse(file)
    const target = database.filter(user => user.mail === queryParams.mail)
    if (target.length === 0) {
      return MailDoesNotExist
    }
    const newusername = removeWeirdCharacters(queryParams.newusername)
    target[0].username = newusername
    fs.writeFileSync(dataPath, JSON.stringify(database))
    return { status: true, data: { newusername } }
  } catch (error) {
    return SomethingWentWrong
  }
}
