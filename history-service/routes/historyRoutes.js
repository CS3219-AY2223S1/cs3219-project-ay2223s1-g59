import express from "express"
const router = express.Router()
import * as historyController from "../controllers/historyController.js"

router.post("/create-history", historyController.createHistory)
router.get("/get-history/:id", historyController.getHistory)

export default router