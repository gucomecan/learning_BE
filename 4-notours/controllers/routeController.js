/* eslint-disable node/no-unsupported-features/es-syntax */
const fs = require('fs')

const { log } = require('console')

const dbFile = `${__dirname}/../dev-data/data/tours-simple.json`
const tours = JSON.parse(fs.readFileSync(dbFile))

exports.checkID = (req, res, next, val) => {
  log('tour id: ', val)
  const tour = tours.find((tourItem) => tourItem.id === +val)

  if (!tour) {
    return res.status(404).json({
      status: 'failed',
      message: 'No such tour',
      app: 'Notours'
    })
  }
  next()
}

exports.checkBody = (req, res, next) => {
  log('----req ---', req)
  if (!req.body.name || !req.body.price) {
    return res.status(400).json({
      status: 'failed',
      message: 'Missing price or name'
    })
  }

  next()
}

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

  const tour = tours.find((tourItem) => tourItem.id === paramId)

  res.status(200).json({
    status: 'success',
    data: { tour }
  })
}

exports.createTour = (req, res) => {
  const id = tours.length // with the assumption id correspond to item index
  const newTour = { ...req.body, id }
  tours.push(newTour)
  fs.writeFile(dbFile, JSON.stringify(tours), () => {
    // 201 - created
    res.status(201).json({
      status: 'success',
      data: { tour: newTour }
    })
  })
}

exports.updateTour = (req, res) => {
  const paramId = req.params.id * 1
  const { body } = req
  log(body)
  const tour = tours.find((tourItem) => tourItem.id === paramId)
  if (!tour) {
    res.status(404).json({
      status: 'failed',
      message: 'No such tour',
      app: 'notours'
    })
  }

  const updatedTour = { ...tour, ...body }
  const filteredTours = tours.filter((tourItem) => tourItem.id !== paramId)
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
  fs.writeFile(dbFile, JSON.stringify(tours.filter((tourItem) => tourItem.id !== +req.params.id)), () => {
    // 204 - no data
    res.status(204).json({
      status: 'success',
      data: null
    })
  })
}
