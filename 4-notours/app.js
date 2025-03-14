const express = require('express')
const morgan = require('morgan')

const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')

const app = express()

// middlewares:
app.use(morgan('dev'))
app.use(express.json())

// // GET all
// app.get(API_TOURS_BASE, getTours)

// // GET tour by path params
// app.get(`${API_TOURS_BASE}/:id`, getTour)

// // POST - create
// app.post(API_TOURS_BASE, createTour)

// // PATCH - update
// app.patch(`${API_TOURS_BASE}/:id`, updateTour)

// // DELETE
// app.delete(`${API_TOURS_BASE}/:id`, deleteTour)

// routes
const API_TOURS_BASE = '/api/v1/tours'
const API_USERS_BASE = '/api/v1/users'

app.use(API_TOURS_BASE, tourRouter)
app.use(API_USERS_BASE, userRouter)

module.exports = app
