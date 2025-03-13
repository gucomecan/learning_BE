const fs = require('fs')
const express = require('express')
const { log } = require('console')

const app = express()
// middler
app.use(express.json())

// app.get('/', (req, res) => {
//   res.status(404).json({ message: 'Hellow from the other side', app: 'Notours' })
// })

// app.post('/', (req, res) => {
//   res.status(200).send('A post request response')
// })
const dbFile = `${__dirname}/dev-data/data/tours-simple.json`
const tours = JSON.parse(fs.readFileSync(dbFile))
const API_BASE = '/api/v1/tours'

const getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
}

const getTour = (req, res) => {
  // NOTE: adding '?' at the end make it optional
  // NOTE: should make a check if id exist at all
  const paramId = req.params.id * 1

  const tour = tours.find((tour) => tour.id === paramId)

  if (!tour) {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour',
      app: 'Notours'
    })
  }
  res.status(200).json({
    status: 'success',
    data: { tour }
  })
}

const createTour = (req, res) => {
  const id = tours[tours.length - 1].id + 1
  const newTour = Object.assign({ id }, req.body)
  tours.push(newTour)
  fs.writeFile(dbFile, JSON.stringify(tours), (err) => {
    // 201 - created
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    })
  })
}

const updateTour = (req, res) => {
  const paramId = req.params.id * 1
  const body = req.body
  log(body)
  const tour = tours.find((tour) => tour.id === paramId)
  if (!tour) {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour',
      app: 'notours'
    })
  }

  const updatedTour = { ...tour, ...body }
  const filteredTours = tours.filter((tour) => tour.id !== paramId)
  const updatedTours = [...filteredTours, updatedTour]
  log(updatedTours)
  fs.writeFile(dbFile, JSON.stringify(updatedTours), () => {
    res.status(200).json({
      status: 'success',
      data: {
        tour: updatedTour
      }
    })
  })
}

const deleteTour = (req, res) => {
  const paramId = req.params.id * 1
  const updatedTours = tours.filter((tour) => tour.id !== paramId)

  if (tours.length === updatedTours.length) {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour',
      app: 'notours'
    })
  }

  fs.writeFile(dbFile, JSON.stringify(updatedTours), () => {
    res.status(204).json({
      status: 'success',
      data: null
    })
  })
}

// GET all
app.get(API_BASE, getTours)

// GET tour by path params
app.get(`${API_BASE}/:id`, getTour)

// POST - create
app.post(API_BASE, createTour)

// PATCH - update
app.patch(`${API_BASE}/:id`, updateTour)

// DELETE
app.delete(`${API_BASE}/:id`, deleteTour)

const port = 3000
app.listen(port, () => {
  console.log(`App running on port ${port}...`)
})
