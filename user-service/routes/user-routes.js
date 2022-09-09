import express from 'express';
import { createUser } from '../controller/user-controller.js';

const router = express.Router();

router.get('/', (_, res) => res.send('Hello World from user-service'))
router.post('/', createUser)

export { router };