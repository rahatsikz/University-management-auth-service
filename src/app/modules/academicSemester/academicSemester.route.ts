import express from 'express'
import { validateRequet } from '../../middleware/validateRequet'
import { AcademicSemesterValidate } from './academicSemester.validation'
import { AcademicSemesterController } from './academicSemester.controller'

const router = express.Router()

router.post(
  '/create-semester',
  validateRequet(AcademicSemesterValidate.createAcademicSemesterZodSchema),
  AcademicSemesterController.createSemester
)

router.get('/', AcademicSemesterController.getAllSemesters)
router.get('/:id', AcademicSemesterController.getSingleSemester)
router.patch(
  '/:id',
  validateRequet(AcademicSemesterValidate.updateAcademicSemesterZodSchema),
  AcademicSemesterController.updateSemester
)
router.delete('/:id', AcademicSemesterController.deleteSemester)

export const AcademicSemesterRoutes = router
