import express from 'express';
import { loginUser } from '../controller/login-controller.js';

const router = express.Router();

router.get('/', (_, res) => res.send('Hello World from login'))
router.post('/', loginUser)

export { router };