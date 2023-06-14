import express from 'express'
import { AdminController } from './admin.controller'
import { validateRequest } from '../../middleware/validateRequest'
import { AdminValidate } from './admin.validate'

const router = express.Router()

router.get('/:id', AdminController.getSingleAdmin)
router.patch(
  '/:id',
  validateRequest(AdminValidate.updateAdminZodSchema),
  AdminController.updateAdmin
)
router.get('/', AdminController.getAllAdmins)

export const AdminRoutes = router
