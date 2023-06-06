import { IUser } from './user.interface'
import { User } from './user.model'
import config from '../../../config/index'
import { generateUsedID } from './user.utils'
import ApiError from '../../../errors/ApiError'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental ID
  // default Password
  user.id = await generateUsedID()

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user')
  }
  return createdUser
}

export const UserService = {
  createUser,
}
