import { IUser } from './user.interface'
import { User } from './user.model'
import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { generateFacultyID, generateStudentID } from './user.utils'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'
import { IFaculty } from '../faculty/faculty.interface'
import { Faculty } from '../faculty/faculty.model'

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

export const UserService = {
  createStudent,
  createFaculty,
}
