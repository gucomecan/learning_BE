const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// middlewares:
console.log('ENV: ', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
app.use(express.json())

// test static file - can be accessed on localhost:3000/overview.html (can skip the public folder in the url)
app.use(express.static(`${__dirname}/public`))

// routes
const API_TOURS_BASE = '/api/v1/tours'
const API_USERS_BASE = '/api/v1/users'

app.use(API_TOURS_BASE, tourRouter)
app.use(API_USERS_BASE, userRouter)

module.exports = app
