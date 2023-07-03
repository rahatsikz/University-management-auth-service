import express from 'express'
import { FacultyController } from './faculty.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { FacultyValidate } from './faculty.validate'
import { ENUM_USER_ROLE } from '../../../enums/user'
import { auth } from '../../middleware/auth'

const router = express.Router()

router.get('/:id', FacultyController.getSingleFaculty)
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  FacultyController.deleteFaculty
)
router.patch(
  '/:id',
  validateRequest(FacultyValidate.updateFacultyZodSchema),
  FacultyController.updateFaculty
)
router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.FACULTY, ENUM_USER_ROLE.STUDENT),
  FacultyController.getAllFaculties
)

export const FacultyRoutes = router
