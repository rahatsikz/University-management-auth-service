import express from 'express'
import { FacultyController } from './faculty.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { FacultyValidate } from './faculty.validate'

const router = express.Router()

router.get('/:id', FacultyController.getSingleFaculty)
router.delete('/:id', FacultyController.deleteFaculty)
router.patch(
  '/:id',
  validateRequest(FacultyValidate.updateFacultyZodSchema),
  FacultyController.updateFaculty
)
router.get('/', FacultyController.getAllFaculties)

export const FacultyRoutes = router
