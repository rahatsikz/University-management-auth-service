import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { AcademicDepartmentValidation } from './academicDepartment.validate'
import { AcademicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.get('/:id', AcademicDepartmentController.getSingleDepartment)
router.patch(
  '/:id',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.updateDepartment
)
router.delete('/:id', AcademicDepartmentController.deleteDepartment)

router.post(
  '/create-department',
  validateRequest(
    AcademicDepartmentValidation.createAcademicDepartmentZodSchema
  ),
  AcademicDepartmentController.createDepartment
)

router.get('/', AcademicDepartmentController.getAllDepartments)

export const AcademicDepartmentRoutes = router
