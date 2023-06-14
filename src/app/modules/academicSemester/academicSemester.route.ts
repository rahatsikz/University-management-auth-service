import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { AcademicSemesterValidate } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.get('/:id', AcademicSemesterController.getSingleSemester)
router.patch(
  '/:id',
  validateRequest(AcademicSemesterValidate.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)
router.delete('/:id', AcademicSemesterController.deleteSemester)
router.post(
  '/create-semester',
  validateRequest(AcademicSemesterValidate.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)
router.get('/', AcademicSemesterController.getAllSemesters)

export const AcademicSemesterRoutes = router
