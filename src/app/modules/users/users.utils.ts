import { User } from './users.model'

export const findLastUserID = async () => {
  const lastUser = await User.findOne({}, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastUser?.id
}

export const generateUsedID = async () => {
  const currentID = (await findLastUserID()) || (0).toString().padStart(5, '0')
  const incrementalID = (parseInt(currentID) + 1).toString().padStart(5, '0')
  return incrementalID
}
