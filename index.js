import http from 'http'
import express from 'express'
import { Server } from 'socket.io'

import * as auth from './authentication/index.js'
import * as ranking from './ranking/index.js'
import { handleHttpResult } from './helpers/index.js'

const PORT = process.env.PORT || 3001

const app = express()
const server = http.createServer(app)
const io = new Server(server)//, { cors: { origin: '*' } })

server.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})

io.on('connection', (socket) => {
  console.log('a user connected')

  socket.emit('howareyou', 'finetho')

  socket.on('hello', (data) => {
    console.log(data, JSON.parse(data))
    socket.emit('howareyou')
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})
