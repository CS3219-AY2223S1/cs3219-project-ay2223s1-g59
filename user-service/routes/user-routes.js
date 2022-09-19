import express from 'express';
import { getUser } from '../controller/user-controller.js';
import { createUser } from '../controller/user-controller.js';
import { loginUser } from '../controller/user-controller.js';
import { logoutUser } from '../controller/user-controller.js';
import { changePassword } from '../controller/user-controller.js';
import { deleteUser } from '../controller/user-controller.js';
import { authenticateJwt } from '../middleware/auth.js'

const router = express.Router();

router.get('/', authenticateJwt, getUser)
router.post('/signup', createUser)
router.post('/login', loginUser)
router.post('/logout', authenticateJwt, logoutUser)
router.put('/change_password', authenticateJwt, changePassword)
router.post('/delete_account', authenticateJwt, deleteUser)

export { router };