import { IUser } from './user.interface'
import { User } from './user.model'
import config from '../../../config/index'
import ApiError from '../../../errors/ApiError'
import { generateStudentID } from './user.utils'
import { IStudent } from '../student/student.interface'
import { AcademicSemester } from '../academicSemester/academicSemester.model'
import mongoose from 'mongoose'
import { Student } from '../student/student.model'
import httpStatus from 'http-status'

const createStudent = async (
  student: IStudent,
  user: IUser
): Promise<IUser | null> => {
  // auto generated incremental ID
  // default Password
  // const academicSemester: IAcademicSemester = {
  //   title: 'Summer',
  //   year: '2025',
  //   code: '02',
  //   startMonth: 'April',
  //   endMonth: 'July',
  // }

  // user.id = await generateStudentID(academicSemester)
  // user.id = await generateFacultyID()

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

export const UserService = {
  createStudent,
}
