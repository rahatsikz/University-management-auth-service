/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose'
import { paginationHelpers } from '../../../helpers/paginationHelpers'
import { IPaginationResponse } from '../../../interfaces/common'
import { IPaginationOption } from '../../../interfaces/pagination'
import { studentSearchableFields } from './student.constant'
import { IStudent, IStudentFilters } from './student.interface'
import { Student } from './student.model'
import ApiError from '../../../errors/ApiError'
import httpStatus from 'http-status'

const getAllStudents = async (
  filters: IStudentFilters,
  paginationOptions: IPaginationOption
): Promise<IPaginationResponse<IStudent[]>> => {
  // const { page = 1, limit = 10 } = paginationOptions
  // const skip = (page - 1) * limit

  const { searchTerm, ...filterData } = filters

  const andConditions = []

  if (searchTerm) {
    andConditions.push({
      $or: studentSearchableFields.map(field => ({
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
  const result = await Student.find(whereConditions)
    .populate([
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
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)

  const total = await Student.countDocuments(whereConditions)

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  }
}

const getSingleStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findById(id).populate([
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

const updateStudent = async (
  id: string,
  payload: Partial<IStudent>
): Promise<IStudent | null> => {
  const isExist = await Student.findOne({ id })
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Student not found')
  }

  const { name, guardian, localGuardian, ...studentData } = payload

  const updateStudentData: Partial<IStudent> = { ...studentData }

  if (name && Object.keys(name).length) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`
      ;(updateStudentData as any)[nameKey] = name[key as keyof typeof name]
    })
  }
  if (guardian && Object.keys(guardian).length) {
    Object.keys(guardian).forEach(key => {
      const guardianKey = `guardian.${key}`
      ;(updateStudentData as any)[guardianKey] =
        guardian[key as keyof typeof guardian]
    })
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    Object.keys(localGuardian).forEach(key => {
      const localGuardianKey = `localGuardian.${key}`
      ;(updateStudentData as any)[localGuardianKey] =
        localGuardian[key as keyof typeof localGuardian]
    })
  }

  const result = await Student.findOneAndUpdate({ id }, updateStudentData, {
    new: true,
  })
  return result
}

const deleteStudent = async (id: string): Promise<IStudent | null> => {
  const result = await Student.findByIdAndDelete(id).populate([
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

export const StudentService = {
  getAllStudents,
  getSingleStudent,
  updateStudent,
  deleteStudent,
}
