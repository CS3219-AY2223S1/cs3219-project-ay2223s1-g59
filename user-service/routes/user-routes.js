import express from 'express';
import { getUser } from '../controller/user-controller.js';
import { createUser } from '../controller/user-controller.js';
import { loginUser } from '../controller/user-controller.js';
import { logoutUser } from '../controller/user-controller.js';
import { changePassword } from '../controller/user-controller.js';
import { deleteUser } from '../controller/user-controller.js';
import { authenticateJwt } from '../middleware/auth.js'

const userRouter = express.Router();

userRouter.get('/', authenticateJwt, getUser);
userRouter.post('/signup', createUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', authenticateJwt, logoutUser);
userRouter.put('/change_password', authenticateJwt, changePassword);
userRouter.post('/delete_account', authenticateJwt, deleteUser);

export default userRouter;