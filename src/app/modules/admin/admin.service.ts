import mongoose, { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IPaginationResponse } from '../../../interfaces/common'
import { IPaginationOption } from '../../../interfaces/pagination'
import { adminSearchableFields } from './admin.constant'
import { IAdmin, IAdminFilters } from './admin.interface'
import { Admin } from './admin.model'
import httpStatus from 'http-status'
import ApiError from '../../../errors/ApiError'
import { User } from '../user/user.model'

const getAllAdmins = async (
  filters: IAdminFilters,
  paginationOptions: IPaginationOption
): Promise<IPaginationResponse<IAdmin[]>> => {
  // const { page = 1, limit = 10 } = paginationOptions
  // const skip = (page - 1) * limit

  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: adminSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    })
  }

  if (Object.keys(filterData).length) {
    andConditions.push({
      $and: Object.entries(filterData).map(([field, value]) => ({
        [field]: value,
      })),
    })
  }

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions)

  const sortCondition: { [key: string]: SortOrder } = {}

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder
  }
  const whereConditions = andConditions.length ? { $and: andConditions } : {}
  const result = await Admin.find(whereConditions)
    .populate([
      {
        path: 'managementDepartment',
      },
    ])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Admin.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const result = await Admin.findById(id).populate([
    {
      path: 'managementDepartment',
    },
  ])
  return result
}

const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found')
  }

  const { name, ...AdminData } = payload

  const updateAdminData: Partial<IAdmin> = { ...AdminData }

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateAdminData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Admin.findOneAndUpdate({ id }, updateAdminData, {
    new: true,
  })
  return result
}

const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Admin not found')
  }

  const session = await mongoose.startSession()

  try {
    session.startTransaction()
    const admin = await Admin.findOneAndDelete({ id }, { session })

    if (!admin) {
      throw new ApiError(httpStatus.NOT_FOUND, 'failed to delete Admin')
    }

    // console.log(Admin)

    await User.deleteOne({ id })

    await session.commitTransaction()
    await session.endSession()

    return admin
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
}

export const AdminService = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
