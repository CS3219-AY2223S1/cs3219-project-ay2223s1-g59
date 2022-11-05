import express from "express"
const router = express.Router()
import * as historyController from "../controllers/historyController.js"

router.post("/create-history", historyController.createHistory)
router.get("/get-history/:username", historyController.getHistory)
router.delete("/delete-all-history", historyController.deleteAllHistory)

export default router