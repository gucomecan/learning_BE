const { log } = require('console')
const EventEmmiter = require('events')
const http = require('http')

// const myEmmiter = new EventEmmiter()
// const eventName = 'newSale'

// // observers that are waiting for event to happen with call back
// myEmmiter.on(eventName, (price) => log('New sale for - ', price, 'lv'))
// myEmmiter.on(eventName, () => log('Sale again'))

// // Object that emmit the event(observer pattern)
// myEmmiter.emit(eventName, 9)
// ----------
const server = http.createServer()

server.on('request', (req, res) => {
  log(req.status)
  res.end('Request received')
})

server.on('request', (req, res) => {
  log('Another request')
})

server.on('close', () => log('server down'))

server.listen(8000, '127.0.0.1', () => log('waiting for request'))
// server.emit('request', { status: 200 })
