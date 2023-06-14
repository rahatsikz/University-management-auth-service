import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IPaginationResponse } from '../../../interfaces/common'
import { IPaginationOption } from '../../../interfaces/pagination'
import { managementDepartmentSearchableFields } from './managementDepartment.constant'
import {
  IManagementDepartment,
  IManagementDepartmentFilters,
} from './managementDepartment.interface'
import { ManagementDepartment } from './managementDepartment.model'

const createManagementDepartment = async (
  payload: IManagementDepartment
): Promise<IManagementDepartment> => {
  const result = await ManagementDepartment.create(payload)
  return result
}

const getAllManagementDepartment = async (
  filters: IManagementDepartmentFilters,
  paginationOptions: IPaginationOption
): Promise<IPaginationResponse<IManagementDepartment[]>> => {
  // const { page = 1, limit = 10 } = paginationOptions
  // const skip = (page - 1) * limit

  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: managementDepartmentSearchableFields.map(field => ({
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
  const result = await ManagementDepartment.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await ManagementDepartment.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findById(id)
  return result
}

const updateManagementDepartment = async (
  id: string,
  payload: Partial<IManagementDepartment>
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findOneAndUpdate(
    { _id: id },
    payload,
    {
      new: true,
    }
  )
  return result
}

const deleteManagementDepartment = async (
  id: string
): Promise<IManagementDepartment | null> => {
  const result = await ManagementDepartment.findByIdAndDelete(id)
  return result
}

export const ManagementDepartmentService = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
}
