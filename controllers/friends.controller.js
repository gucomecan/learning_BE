const model = require('../models/friends.model')

function getFiends(req, res) {
  res.json(model)
}

function getFiend(req, res) {
  const friendId = req.params.friendId
  const friend = model[friendId]
  if (friend) {
    res.status(200).json(friend)
  } else {
    res.status(404).json({ error: 'Friend not found' })
  }
}

function postFriend(req, res) {
  if (!req.body.name) return res.status(400).json({ error: 'Bad input for creating a friend' })

  const id = Object.keys(model).length
  model[id] = req.body.name
  res.status(200).json(model[id])
}

module.exports = {
  getFiends,
  getFiend,
  postFriend
}