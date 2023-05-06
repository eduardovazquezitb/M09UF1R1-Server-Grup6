import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

import * as auth from './authentication/index.js'
import * as ranking from './ranking/index.js'
import { getError } from './helpers/index.js'

const PORT = process.env.PORT || 3001

const app = express()
const server = http.createServer(app)
const io = new Server(server)//, { cors: { origin: '*' } })

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

const SomethingWentWrong = { status: false, error: 500, message: 'Internal Error' }
const InvalidCredentials = { status: false, error: 422, message: 'Invalid Credentials' }

// Connection is stablished on authentication.
// When connection is broken authentication is lost. (to do on client)
// If authentication is failed disconnect.
io.use((socket, next) => {
  const query = structuredClone(socket.handshake.headers)
  if (Object.keys(query).includes('superuser')) {
    query.superuser = JSON.parse(query.superuser)
  }
  switch (query.querytype) {
    case 'authentication': {
      const result = auth.authenticate(query)
      console.log(result)
      if (result.status && result.data.isUser) { return next() }
      if (result.status && !result.data.isUser) { return next(getError(InvalidCredentials)) }
      return next(getError(result))
    }
    case 'newUser': {
      const result = auth.createNewUser(query)
      if (result.status) { return next() }
      return next(getError(result))
    }
    default:
      return next(getError(SomethingWentWrong))
  }
})

io.on('connection', (socket) => {
  socket.emit('ping', { message: 'mafia-clicker', version: '1.0.0' })

  socket.on('user', (data) => {
    try {
      const input = JSON.parse(data)
      const result = auth.getUserData(input)
      if (!result.status) throw getError(result)
      socket.emit('user', result.data)
    } catch (error) {
      socket.emit('user', error.toString())
    }
  })

  socket.on('users', () => {
    try {
      const result = auth.getAllUsersData()
      if (!result.status) throw getError(result)
      socket.emit('users', result.data)
    } catch (error) {
      socket.emit('users', error.toString())
    }
  })

  socket.on('changeUsername', (data) => {
    try {
      const input = JSON.parse(data)
      const result = auth.updateUsername(input)
      if (!result.status) throw getError(result)
      socket.emit('changeUsername', result.data)
    } catch (error) {
      socket.emit('changeUsername', error.toString())
    }
  })

  socket.on('getRanking', () => {
    try {
      const result = ranking.getWholeRanking()
      if (!result.status) throw getError(result)
      socket.emit('getRanking', result.data)
    } catch (error) {
      socket.emit('getRanking', error.toString())
    }
  })

  socket.on('updateScore', (data) => {
    try {
      const input = JSON.parse(data)
      const result = ranking.updatePosition(input)
      if (!result.status) throw getError(result)
      socket.emit('updateScore', result.data)
    } catch (error) {
      socket.emit('updateScore', error.toString())
    }
  })

  socket.on('deleteScore', (data) => {
    try {
      const input = JSON.parse(data)
      const result = ranking.deletePositionScore(input)
      if (!result.status) throw getError(result)
      socket.emit('deleteScore')
    } catch (error) {
      socket.emit('deleteScore', error.toString())
    }
  })

  // socket.on('disconnect', () => {
  //  console.log('user disconnected')
  // })
})
