import express from "express";
const router = express.Router();
import { getEasyQuestion } from "../controller/question-controller.js";
import { getMediumQuestion } from "../controller/question-controller.js";
import { getHardQuestion } from "../controller/question-controller.js";

//router.get("/", getQuestions);
router.get("/easy", getEasyQuestion);
router.get("/medium", getMediumQuestion);
router.get("/hard", getHardQuestion);

export default router;
