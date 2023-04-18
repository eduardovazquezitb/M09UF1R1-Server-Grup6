// server/index.js

import express from 'express'

import * as auth from './authentication/index.js'

const PORT = process.env.PORT || 3001

const app = express()

app.listen(PORT, () => { // This is needed to bind to the socket and listen
  console.log('HELLO MY DUDES!')
})

app.get('/', (req, res) => {
  res.json({ message: 'mafia-clicker', version: '1.0.0' })
})

app.get('/auth', (req, res) => {
  const result = auth.authenticate(req.query)
  res.json({ isUser: result })
})
