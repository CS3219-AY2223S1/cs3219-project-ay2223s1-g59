import express from 'express'
const router = express.Router()
import * as matchController from '../controllers/matchController.js'

router.post('/find-match', matchController.findMatch)
router.delete('/cancel-find-match', matchController.cancelFindMatch)
router.get('/interview/:id', matchController.getInterview)
router.delete('/end-interview/:id', matchController.deleteInterview)

export default router