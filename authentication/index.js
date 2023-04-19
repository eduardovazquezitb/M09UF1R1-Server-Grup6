import fs from 'fs'

import { AuthDataDto, UserRequestDto } from './model/index.js'

const InvalidQuery = { status: false, message: 'Invalid Query' }
const SomethingWentWrong = { status: false, message: 'Something Went Wrong' }

export function authenticate (params) {
  // check if params has the correct json structure
  if (!AuthDataDto.typeOf(params)) {
    return InvalidQuery
  }

  const authData = new AuthDataDto(params)

  // check if data file contains user
  try {
    const file = fs.readFileSync('./authentication/data.json')

    const database = JSON.parse(file)
    const result = database.some(user =>
      authData.Equals(user)
    )
    return { status: true, isUser: result }
  } catch (error) {
    console.error(error)
    return SomethingWentWrong
  }
}

export function getUserData (params) {
  // check if params has the correct json structure
  if (!UserRequestDto.typeOf(params)) {
    return InvalidQuery
  }

  const userRequestDto = new UserRequestDto(params)

  // check if data file contains user
  try {
    const file = fs.readFileSync('./authentication/data.json')

    const database = JSON.parse(file)
    const result = database.filter(user =>
      user.mail === userRequestDto.mail
    )
    if (result.length > 0) {
      return { status: true, isUser: true, data: result[0] }
    }
    return { status: true, isUser: false }
  } catch (error) {
    console.error(error)
    return SomethingWentWrong
  }
}

export function getAllUsersData () {
  try {
    const file = fs.readFileSync('./authentication/data.json')

    const database = JSON.parse(file)
    return { status: true, data: database }
  } catch (error) {
    console.error(error)
    return SomethingWentWrong
  }
}
