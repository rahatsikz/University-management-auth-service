import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { ManagementDepartmentValidate } from './managementDepartment.validate'
import { ManagementDepartmentController } from './managementDepartment.controller'

const router = express.Router()

router.get('/:id', ManagementDepartmentController.getSingleManagementDepartment)
router.patch(
  '/:id',
  validateRequest(
    ManagementDepartmentValidate.updateManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.updateManagementDepartment
)
router.delete('/:id', ManagementDepartmentController.deleteManagementDepartment)
router.post(
  '/create-management',
  validateRequest(
    ManagementDepartmentValidate.createManagementDepartmentZodSchema
  ),
  ManagementDepartmentController.createManagementDepartment
)

router.get('/', ManagementDepartmentController.getAllManagementDepartment)

export const ManagementDepartmentRoutes = router
