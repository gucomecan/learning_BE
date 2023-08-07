const path = require('path')

function getMessages(req, res) {
  // res.sendFile(path.join(__dirname, '..', 'public', 'images', 'skimountain.jpg'))
  res.render('messages', {
    title: 'Messages',
    friend: 'Le Feropino'
  })
}

function postMessages(req, res) {
  console.log('POST messages...')
}

module.exports = {
  getMessages,
  postMessages
}