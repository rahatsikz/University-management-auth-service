import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'
import {
  ILoginUserResponse,
  ILoginUser,
  IRefreshTokenResponse,
  IChangePassword,
} from './auth.interface'
import { JwtPayload, Secret } from 'jsonwebtoken'
import config from '../../../config'
import { jwtHelpers } from '../../../helpers/jwtHelpers'
import bcrypt from 'bcrypt'

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { id, password } = payload

  //   const isUserExists = await User.findOne(
  //     { id },
  //     { id: 1, password: 1, needsPasswordChange: 1 }
  //   ).lean()

  const user = new User()

  const isUserExists = await user.isUserExists(id)

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  /* const isPasswordMatched = await bcrypt.compare(
    password,
    isUserExists?.password
  ) */

  if (
    isUserExists.password &&
    !(await user.isPasswordMatched(password, isUserExists?.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect')
  }

  const { id: userID, role, needsPasswordChange } = isUserExists

  const accessToken = jwtHelpers.createToken(
    { userID, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  const refreshToken = jwtHelpers.createToken(
    { userID, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  )

  return {
    accessToken,
    refreshToken,
    needsPasswordChange,
  }
}

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null
  try {
    verifiedToken = jwtHelpers.verifiedToken(
      token,
      config.jwt.refresh_secret as Secret
    )
    // console.log(verifiedToken)
  } catch (err) {
    // err
    throw new ApiError(httpStatus.FORBIDDEN, 'invalid refresh token')
  }

  const { userID } = verifiedToken

  const user = new User()

  const isUserExists = await user.isUserExists(userID)

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'user does not exist')
  }

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExists.id,
      role: isUserExists.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  )

  return {
    accessToken: newAccessToken,
  }
}

const changePassword = async (
  user: JwtPayload | null,
  payload: IChangePassword
): Promise<void> => {
  const { oldPassword, newPassword } = payload

  // console.log(user)

  const passwordChangeUser = new User()

  const isUserExists = await passwordChangeUser.isUserExists(user?.userID)

  if (!isUserExists) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist')
  }

  if (
    isUserExists.password &&
    !(await passwordChangeUser.isPasswordMatched(
      oldPassword,
      isUserExists?.password
    ))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Old Password is incorrect')
  }

  const newHashedPassword = await bcrypt.hash(
    newPassword,
    Number(config.bcrypt_salt_rounds)
  )

  const updatedData = {
    password: newHashedPassword,
    needsPasswordChange: false,
    passwordChangedAt: new Date(),
  }

  await User.findOneAndUpdate({ id: user?.userID }, updatedData)
}

export const AuthService = {
  loginUser,
  refreshToken,
  changePassword,
}
