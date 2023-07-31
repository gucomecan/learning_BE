const express = require('express')

const PORT = 3000
const app = express()

let resource_friends = {
  0: 'Issac Newton',
  1: 'Le Friend of mine',
  2: 'Le Test Friend'
}

const logger = (req, res, next) => {
  const startTime = Date.now()
  next()
  const endTime = Date.now()
  console.log(`---${req.method}: ${req.url} -> ${endTime - startTime}ms`)
}

app.use(logger)
app.use(express.json())

app.post('/friends', (req, res) => {
  if (!req.body.name) return res.status(400).json({ error: 'Bad input for creating a friend' })

  const id = Object.keys(resource_friends).length
  resource_friends[id] = req.body.name
  res.status(200).json(resource_friends[id])
})

app.get('/friends', (req, res) => {
  res.json(resource_friends)
})

app.get('/friends/:friendId', (req, res) => {
  const friendId = req.params.friendId
  const friend = resource_friends[friendId]
  if (friend) {
    res.status(200).json(friend)
  } else {
    res.status(404).json({ error: 'Friend not found' })
  }
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))