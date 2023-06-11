import express from 'express'
import { AcademicFacultyController } from './academicFaculty.controller'
import { validateRequet } from '../../middleware/validateRequet'
import { AcademicFacultyValidate } from './academicFaculty.validate'

const router = express.Router()

router.post(
  '/create-faculty',
  validateRequet(AcademicFacultyValidate.createAcademicFacultyZodSchema),
  AcademicFacultyController.createFaculty
)

router.get('/', AcademicFacultyController.getAllFaculties)

router.get('/:id', AcademicFacultyController.getSingleFaculty)
router.patch(
  '/:id',
  validateRequet(AcademicFacultyValidate.updateAcademicFacultyZodSchema),
  AcademicFacultyController.updateFaculty
)
router.delete('/:id', AcademicFacultyController.deleteFaculty)

export const AcademicFacultyRoutes = router
