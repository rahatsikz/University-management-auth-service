import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { AuthService } from './auth.service'
import config from '../../../config'
import { IRefreshTokenResponse } from './auth.interface'
import { AuthenticatedRequest } from '../../middleware/auth'

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body
  const result = await AuthService.loginUser(loginData)
  const { refreshToken, ...others } = result

  const cookieOption = {
    secure: config.env === 'Production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOption)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully',
    data: others,
  })
  // console.log(req.body)
})

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies
  const result = await AuthService.refreshToken(refreshToken)

  const cookieOption = {
    secure: config.env === 'Production',
    httpOnly: true,
  }

  res.cookie('refreshToken', refreshToken, cookieOption)

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'refresh token retrieved successfully',
    data: result,
  })
  // console.log(req.body)
})

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const { ...passwordData } = req.body
  const { user } = req as AuthenticatedRequest
  const result = await AuthService.changePassword(user, passwordData)

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'password changed successfully',
    data: result,
  })
  // console.log(req.body)
})

export const AuthController = {
  loginUser,
  refreshToken,
  changePassword,
}
