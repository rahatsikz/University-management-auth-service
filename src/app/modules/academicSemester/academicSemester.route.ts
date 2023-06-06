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

export const AcademicSemesterRoutes = router
