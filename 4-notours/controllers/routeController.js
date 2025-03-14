const fs = require('fs')

const { log } = require('console')

const dbFile = `${__dirname}/../dev-data/data/tours-simple.json`
const tours = JSON.parse(fs.readFileSync(dbFile))

// route handlers/controllers
exports.getTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: { tours }
  })
}

exports.getTour = (req, res) => {
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

exports.createTour = (req, res) => {
  const id = tours.length // with the assumption id correspond to item index
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

exports.updateTour = (req, res) => {
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

exports.deleteTour = (req, res) => {
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
    // 204 - no data
    res.status(204).json({
      status: 'success',
      data: null
    })
  })
}
