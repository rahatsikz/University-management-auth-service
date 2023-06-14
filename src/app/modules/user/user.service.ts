import { IUser } from './user.interface'
import { User } from './user.model'
import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import {
  generateAdminID,
  generateFacultyID,
  generateStudentID,
} from './user.utils'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'
import { IAdmin } from '../admin/admin.interface'
import { Admin } from '../admin/admin.model'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_student_pass as string
  }

  user.role = 'student'

  const academicSemester = await AcademicSemester.findById(
    student.academicSemester
  )

  const session = await mongoose.startSession()

  let newUserAllData = null
  try {
    session.startTransaction()
    const id = await generateStudentID(academicSemester)
    user.id = id
    student.id = id

    const newStudent = await Student.create([student], { session })

    if (!newStudent.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create student')
    }

    user.student = newStudent[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }
    newUserAllData = newUser[0]
    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }
  if (newUserAllData) {
    newUserAllData = await User.findOne({ id: newUserAllData.id }).populate({
      path: 'student',
      populate: [
        {
          path: 'academicSemester',
        },
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    })
  }

  return newUserAllData

  // const createdUser = await User.create(user)
  // if (!createdUser) {
  //   throw new ApiError(400, 'Failed to create user')
  // }
  // return createdUser
}

const createFaculty = async (
  faculty: IFaculty,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_faculty_pass as string
  }

  user.role = 'faculty'

  const session = await mongoose.startSession()

  let newFacultyAllData = null

  try {
    session.startTransaction()
    const id = await generateFacultyID()

    user.id = id
    faculty.id = id

    const newFaculty = await Faculty.create([faculty], { session })

    if (!newFaculty.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create faculty')
    }

    user.faculty = newFaculty[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newFacultyAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newFacultyAllData) {
    newFacultyAllData = await User.findOne({
      id: newFacultyAllData.id,
    }).populate({
      path: 'faculty',
      populate: [
        {
          path: 'academicFaculty',
        },
        {
          path: 'academicDepartment',
        },
      ],
    })
  }

  return newFacultyAllData
}

const createAdmin = async (
  admin: IAdmin,
  user: IUser
): Promise<IUser | null> => {
  if (!user.password) {
    user.password = config.default_admin_pass as string
  }

  user.role = 'admin'

  const session = await mongoose.startSession()

  let newAdminAllData = null

  try {
    session.startTransaction()
    const id = await generateAdminID()

    user.id = id
    admin.id = id

    const newAdmin = await Admin.create([admin], { session })

    if (!newAdmin.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create Admin')
    }

    user.admin = newAdmin[0]._id

    const newUser = await User.create([user], { session })

    if (!newUser.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to create user')
    }

    newAdminAllData = newUser[0]

    await session.commitTransaction()
    await session.endSession()
  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw error
  }

  if (newAdminAllData) {
    newAdminAllData = await User.findOne({
      id: newAdminAllData.id,
    }).populate({
      path: 'admin',
      populate: [
        {
          path: 'managementDepartment',
        },
      ],
    })
  }

  return newAdminAllData
}

export const UserService = {
  createStudent,
  createFaculty,
  createAdmin,
}
