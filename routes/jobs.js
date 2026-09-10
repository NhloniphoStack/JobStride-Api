import { getJobs, addJob, getJob, deleteJob, editJob } from '../controllers/jobsController.js' 
import { requireAuth } from '../middleware/requireAuth.js'
import express from 'express'


export const jobsRouter = express.Router()


jobsRouter.get('/', requireAuth, getJobs)

jobsRouter.post('/add', requireAuth, addJob)

jobsRouter.get('/:jobid', requireAuth, getJob)

jobsRouter.delete('/:jobid', requireAuth, deleteJob)

jobsRouter.patch('/:jobid', requireAuth, editJob)