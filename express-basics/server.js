const express = require('express')
const path = require('path')

const friendsRouter = require('./routes/friends.router')
const messagesRouter = require('./routes/messages.router')

const PORT = 3000
const app = express()
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

const logger = (req, res, next) => {
  const startTime = Date.now()
  next()
  const delta = Date.now() - startTime
  console.log(`---${req.method}: ${req.baseUrl}${req.url} -> ${delta}ms`)
}


app.use('/site', express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(logger)
app.get('/', (req, res) => {
  res.render('where', {
    title: 'Test pages',
    country: 'Le France'
  })
})
app.use('/friends', friendsRouter)
app.use('/messages', messagesRouter)

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))