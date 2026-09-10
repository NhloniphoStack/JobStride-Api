import express from 'express'
import { getUser } from '../controllers/apiController.js'
import { requireAuth } from '../middleware/requireAuth.js'

export const apiRouter = express.Router()

apiRouter.get('/me', requireAuth, getUser)