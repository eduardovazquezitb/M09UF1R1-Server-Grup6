// server/index.js

import express from 'express'

import * as auth from './authentication/index.js'

import { AuthData } from './authentication/model.js'

const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => {
  console.log('HELLO MY DUDES!')
})

app.get('/api', (req, res) => {
  console.log(req)
  res.json({ hello: 'henlo', query: req.query, params: req.params })
})

app.get('/', (req, res) => {
  res.json({ message: 'mafia-clicker', version: '1.0.0' })
})

app.get('/auth', (req, res) => {
  const result = auth.authenticate(req.query)
  res.json({ isUser: result })
})
