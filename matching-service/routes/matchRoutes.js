import express from 'express'
const router = express.Router()
import * as matchController from '../controllers/matchController.js'

router.post('/find-match', matchController.findMatch)
router.delete('/cancel-find-match', matchController.cancelFindMatch)
router.get('/interview-id/:id', matchController.getInterviewById)
router.delete('/end-interview/:id', matchController.deleteInterview)
router.get("/interview-username/:username", matchController.getInterviewByUsername)

export default router