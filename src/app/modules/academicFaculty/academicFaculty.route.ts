import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { AcademicFacultyValidate } from './academicFaculty.validate'

const router = express.Router()

router.get('/:id', AcademicFacultyController.getSingleFaculty)
router.patch(
  '/:id',
  validateRequest(AcademicFacultyValidate.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
)
router.delete('/:id', AcademicFacultyController.deleteFaculty)

router.post(
  '/create-faculty',
  validateRequest(AcademicFacultyValidate.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
)

router.get('/', AcademicFacultyController.getAllFaculties)

export const AcademicFacultyRoutes = router
