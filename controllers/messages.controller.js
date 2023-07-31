function getMessages(req, res) {
  res.send('<ul><li>Hello world!</li></ul>')
}

function postMessages(req, res) {
  console.log('POST messages...')
}

module.exports = {
  getMessages,
  postMessages
}