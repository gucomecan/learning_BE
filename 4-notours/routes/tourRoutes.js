const express = require('express')
const {
  getTours,
  getTour,
  createTour,
  updateTour,
  deleteTour,
  checkID,
  checkBody
} = require('../controllers/routeController')

const router = express.Router()
// middlewares
router.param('id', checkID)

// routes
router.route('/').get(getTours).post(checkBody, createTour)
router.route('/:id').get(getTour).patch(updateTour).delete(deleteTour)

module.exports = router
