import express from 'express';
import { createUser } from '../controller/user-controller.js';
import { loginUser } from '../controller/user-controller.js';
import { logoutUser } from '../controller/user-controller.js';
import { changePassword } from '../controller/user-controller.js';
import { deleteUser } from '../controller/user-controller.js';

const router = express.Router();

router.get('/', (_, res) => res.send('Hello World from user'))
router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.put('/change_password', changePassword)
router.delete('/delete_account', deleteUser)

export { router };