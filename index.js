// server/index.js

import express from 'express'
import bodyParser from 'body-parser'

import * as auth from './authentication/index.js'
import { handleHttpResult } from './helpers/index.js'

const PORT = process.env.PORT || 3001

const app = express()

app.use(bodyParser.json())

app.listen(PORT, () => { // This is needed to bind to the socket and listen
  console.log('HELLO MY DUDES!')
})

app.get('/', (req, res) => {
  res.json({ message: 'mafia-clicker', version: '1.0.0' })
})

app.get('/auth', (req, res) => {
  const result = auth.authenticate(req.body)
  handleHttpResult(res, result)
})

app.get('/user', (req, res) => {
  const result = auth.getUserData(req.body)
  handleHttpResult(res, result)
})

app.get('/users', (req, res) => {
  const result = auth.getAllUsersData()
  handleHttpResult(res, result)
})

app.post('/newUser', (req, res) => {
  const result = auth.createNewUser(req.body)
  handleHttpResult(res, result)
})

app.put('/changeUsername', (req, res) => {
  const result = auth.updateUsername(req.body)
  handleHttpResult(res, result)
})
