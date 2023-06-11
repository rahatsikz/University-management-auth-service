import express from 'express'
import { validateRequet } from '../../middleware/validateRequet'
import { AcademicDepartmentValidation } from './academicDepartment.validate'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post(
  '/create-department',
  validateRequet(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
)

router.get('/', AcademicDepartmentController.getAllDepartments)
router.get('/:id', AcademicDepartmentController.getSingleDepartment)
router.patch(
  '/:id',
  validateRequet(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
)
router.delete('/:id', AcademicDepartmentController.deleteDepartment)

export const AcademicDepartmentRoutes = router
