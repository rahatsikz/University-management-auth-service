import { NextFunction, Request, Response } from 'express'
import ApiError from '../../errors/ApiError'
import httpStatus from 'http-status'
import { jwtHelpers } from '../../helpers/jwtHelpers'
import config from '../../config'
import { Secret } from 'jsonwebtoken'

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
export interface AuthenticatedRequest extends Request {
  user: any
}

export const auth =
  (...requiredRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers.authorization
      if (!token) {
        throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized')
      }

      let verifiedUser = null

      verifiedUser = jwtHelpers.verifiedToken(
        token,
        config.jwt.secret as Secret
      )

      // req.user = verifiedUser
      ;(req as AuthenticatedRequest).user = verifiedUser

      if (requiredRoles.length && !requiredRoles.includes(verifiedUser.role)) {
        throw new ApiError(httpStatus.FORBIDDEN, 'forbidden')
      }
      next()
    } catch (error) {
      next(error)
    }
  }
