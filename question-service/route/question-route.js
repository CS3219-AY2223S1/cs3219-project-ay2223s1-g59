import express from "express";
const router = express.Router();
import {
  getEasyQuestion,
  getMediumQuestion,
  getHardQuestion,
} from "../controller/question-controller.js";

//router.get("/", getQuestions);
router.get("/easy", getEasyQuestion);
router.get("/medium", getMediumQuestion);
router.get("/hard", getHardQuestion);

export default router;
