import express from 'express'
import UserController from '../controller/UserController'

export const userRouter = express.Router()

userRouter.post('/signup', new UserController().addUser)
userRouter.get('/allBands', new UserController().getAllBands)
userRouter.put('/approve/:id',new UserController().approveBand)
userRouter.delete('/reprove/:id', new UserController().reproveBand)
userRouter.post('/login', new UserController().login)