import fs from 'fs'

// import { hasWeirdCharacters, removeWeirdCharacters } from '../helpers/index.js'

import { PositionDto, MailDto, ScoreUpdateDto } from './model/index.js'

const InvalidQuery = { status: false, error: 422, message: 'Invalid Query Parameters' }
const SomethingWentWrong = { status: false, error: 500, message: 'Internal Error' }
const PlayerNotFound = { status: false, error: 422, message: 'Player not found' }

const dataPath = './ranking/data.json'

export function createNewPosition (params) {
  if (!PositionDto.typeOf(params)) {
    return InvalidQuery
  }

  const positionData = new PositionDto(params)

  try {
    const file = fs.readFileSync(dataPath)
    const database = JSON.parse(file)
    database.push(positionData)
    fs.writeFileSync(dataPath, JSON.stringify(database))
    return { status: true, data: {} }
  } catch (error) {
    return SomethingWentWrong
  }
}

export function updatePosition (params) {
  if (!ScoreUpdateDto.typeOf(params)) {
    return InvalidQuery
  }

  const positionData = new ScoreUpdateDto(params)

  try {
    const file = fs.readFileSync(dataPath)
    const database = JSON.parse(file)
    const target = database.filter(user => user.mail === positionData.mail)
    if (target.length === 0) {
      return PlayerNotFound
    }
    target[0].score += positionData.score
    sortListByScore(database)
    fs.writeFileSync(dataPath, JSON.stringify(database))
    return { status: true, data: { username: target[0].username, mail: target[0].mail, score: target[0].score } }
  } catch (error) {
    return SomethingWentWrong
  }
}

export function deletePositionScore (params) {
  if (!MailDto.typeOf(params)) {
    return InvalidQuery
  }

  const positionData = new MailDto(params)

  try {
    const file = fs.readFileSync(dataPath)
    const database = JSON.parse(file)
    const target = database.filter(user => user.mail === positionData.mail)
    if (target.length === 0) {
      return PlayerNotFound
    }
    target[0].score = 0
    sortListByScore(database)
    fs.writeFileSync(dataPath, JSON.stringify(database))
    return { status: true, data: {} }
  } catch (error) {
    return SomethingWentWrong
  }
}

export function getWholeRanking () {
  try {
    const file = fs.readFileSync(dataPath)
    const database = JSON.parse(file)
    return { status: true, data: database }
  } catch (error) {
    return SomethingWentWrong
  }
}

function sortListByScore (list) {
  list.sort((a, b) => (a.score < b.score) ? 1 : -1)
}
