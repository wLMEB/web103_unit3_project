import express from 'express'
import { getAllLocations, getLocationById } from '../controllers/locationsController.js'
import { getEventsByLocation } from '../controllers/eventsController.js'

const router = express.Router()

router.get('/', getAllLocations)
router.get('/:id', getLocationById)
router.get('/:id/events', getEventsByLocation)

export default router
