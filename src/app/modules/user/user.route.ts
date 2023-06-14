import express from 'express'
import { UserController } from './user.controller'
import { UserValidate } from './user.validate'
import { validateRequest } from '../../middleware/validateRequest'

const router = express.Router()

router.post(
  '/create-student',
  validateRequest(UserValidate.createUserZodSchema),
  UserController.createStudent
)

// create faculty

// create admin

export const UserRoutes = router
