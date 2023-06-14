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

router.post(
  '/create-faculty',
  validateRequest(UserValidate.createFacultyZodSchema),
  UserController.createFaculty
)

// create admin
router.post(
  '/create-admin',
  validateRequest(UserValidate.createAdminZodSchema),
  UserController.createAdmin
)

export const UserRoutes = router
