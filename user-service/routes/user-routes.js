import express from 'express'
import * as userController from '../controller/user-controller.js'
import { authenticateJwt } from '../middleware/auth.js'

const userRouter = express.Router()

userRouter.get('/', authenticateJwt, userController.getUser)
userRouter.post('/signup', userController.createUser)
userRouter.post('/login', userController.loginUser)
userRouter.get('/logout', authenticateJwt, userController.logoutUser)
userRouter.put('/change_password', authenticateJwt, userController.changePassword)
userRouter.post('/delete_account', authenticateJwt, userController.deleteUser)

export default userRouter