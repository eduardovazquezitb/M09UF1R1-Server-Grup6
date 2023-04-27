// server/index.js

import express from 'express'
import bodyParser from 'body-parser'

import * as auth from './authentication/index.js'
import * as ranking from './ranking/index.js'
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

app.post('/auth', (req, res) => {
  const result = auth.authenticate(req.body)
  handleHttpResult(res, result)
})

app.post('/user', (req, res) => {
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

app.get('/getRanking', (req, res) => {
  const result = ranking.getWholeRanking(req.body)
  handleHttpResult(res, result)
})

app.put('/updateScore', (req, res) => {
  const result = ranking.updatePosition(req.body)
  handleHttpResult(res, result)
})

app.delete('/deleteScore', (req, res) => {
  const result = ranking.deletePositionScore(req.body)
  handleHttpResult(res, result)
})
