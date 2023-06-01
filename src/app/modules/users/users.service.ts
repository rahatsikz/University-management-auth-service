import { IUser } from './users.interface'
import { User } from './users.model'
import config from '../../../config/index'
import { generateUsedID } from './users.utils'

const createUser = async (user: IUser): Promise<IUser | null> => {
  // auto generated incremental ID
  // default Password
  user.id = await generateUsedID()

  if (!user.password) {
    user.password = config.default_user_pass as string
  }

  const createdUser = await User.create(user)
  if (!createdUser) {
    throw new Error('Failed to create user')
  }
  return createdUser
}

export default { createUser }
