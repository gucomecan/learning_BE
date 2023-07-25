const express = require('express')

const PORT = 3000
const app = express()

const resource_friends = {
  0: 'Issac Newton',
  1: 'Le Friend of mine',
  2: 'Le Test Friend'
}

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