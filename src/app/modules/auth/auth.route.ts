import express from 'express'
import { validateRequest } from '../../middleware/validateRequest'
import { AuthValidate } from './auth.validate'
import { AuthController } from './auth.controller'
import { auth } from '../../middleware/auth'
import { ENUM_USER_ROLE } from '../../../enums/user'

const router = express.Router()

router.post(
  '/login',
  validateRequest(AuthValidate.loginZodSchema),
  AuthController.loginUser
)

router.post(
  '/refresh-token',
  validateRequest(AuthValidate.refreshTokenZodSchema),
  AuthController.refreshToken
)

router.post(
  '/change-password',
  auth(
    ENUM_USER_ROLE.ADMIN,
    ENUM_USER_ROLE.SUPER_ADMIN,
    ENUM_USER_ROLE.FACULTY,
    ENUM_USER_ROLE.STUDENT
  ),
  validateRequest(AuthValidate.changePasswordZodSchema),
  AuthController.changePassword
)

export const AuthRoutes = router
