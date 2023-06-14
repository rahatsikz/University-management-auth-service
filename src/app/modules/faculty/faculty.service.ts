import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IPaginationResponse } from '../../../interfaces/common'
import { IPaginationOption } from '../../../interfaces/pagination'
import { facultySearchableFields } from './faculty.constant'
import { IFaculty, IFacultyFilters } from './faculty.interface'
import { Faculty } from './faculty.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const getAllFaculties = async (
  filters: IFacultyFilters,
  paginationOptions: IPaginationOption
): Promise<IPaginationResponse<IFaculty[]>> => {
  // const { page = 1, limit = 10 } = paginationOptions
  // const skip = (page - 1) * limit

  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: facultySearchableFields.map(field => ({
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
  const result = await Faculty.find(whereConditions)
    .populate([
      {
        path: 'academicFaculty',
      },
      {
        path: 'academicDepartment',
      },
    ])
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Faculty.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findById(id).populate([
    {
      path: 'academicFaculty',
    },
    {
      path: 'academicDepartment',
    },
  ])
  return result
}

const deleteFaculty = async (id: string): Promise<IFaculty | null> => {
  const result = await Faculty.findByIdAndDelete(id).populate([
    {
      path: 'academicSemester',
    },
    {
      path: 'academicFaculty',
    },
    {
      path: 'academicDepartment',
    },
  ])
  return result
}

const updateFaculty = async (
  id: string,
  payload: Partial<IFaculty>
): Promise<IFaculty | null> => {
  const isExist = await Faculty.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Faculty not found')
  }

  const { name, ...FacultyData } = payload

  const updateFacultyData: Partial<IFaculty> = { ...FacultyData }

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateFacultyData as any)[nameKey] = name[key as keyof typeof name]
    })
  }

  const result = await Faculty.findOneAndUpdate({ id }, updateFacultyData, {
    new: true,
  })
  return result
}

export const FacultyService = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
