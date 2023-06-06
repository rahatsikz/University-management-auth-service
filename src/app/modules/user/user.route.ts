import express from 'express'
import { UserController } from './user.controller'
import { UserValidate } from './user.validate'
import { validateRequet } from '../../middleware/validateRequet'

const router = express.Router()

router.post(
  '/create-user',
  validateRequet(UserValidate.createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
