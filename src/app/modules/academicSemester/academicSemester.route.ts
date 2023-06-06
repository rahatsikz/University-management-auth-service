import express from 'express'
// import { UserController } from './user.controller'
import { validateRequet } from '../../middleware/validateRequet'
import { AcademicSemesterValidate } from './academicSemester.validation'

const router = express.Router()

router.post(
  '/create-user',
  validateRequet(AcademicSemesterValidate.createAcademicSemesterZodSchema)
  //   UserController.createUser
)

export const UserRoutes = router
