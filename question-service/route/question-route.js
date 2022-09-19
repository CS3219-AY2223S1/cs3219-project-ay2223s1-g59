import express from "express";
const router = express.Router();
import * as questionController from "../controller/question-controller";
import { getEasyQuestion } from "./controller/question-controller";
import { getMediumQuestion } from "./controller/question-controller";
import { getHardQuestion } from "./controller/question-controller";

router.get("/", getQuestions);
router.get("/easy", getEasyQuestion);
router.get("/medium", getMediumQuestion);
router.get("/hard", getHardQuestion);

export default router;
