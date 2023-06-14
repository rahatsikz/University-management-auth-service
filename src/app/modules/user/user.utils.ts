import { IAcademicSemester } from '../academicSemester/academicSemester.interface'
import { User } from './user.model'

export const findLastStudnetID = async () => {
  const lastStudent = await User.findOne({ role: 'student' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  // console.log(lastStudent?.id, 'p')

  return lastStudent?.id && lastStudent.id.substring(4)
}

export const generateStudentID = async (
  academicSemester: IAcademicSemester | null
): Promise<string> => {
  const currentID =
    (await findLastStudnetID()) || (0).toString().padStart(5, '0')
  // console.log({ currentID })
  let incrementalID = (parseInt(currentID) + 1).toString().padStart(5, '0')

  incrementalID = `${academicSemester?.year.substring(2)}${
    academicSemester?.code
  }${incrementalID}`
  // console.log({ incrementalID })

  return incrementalID
}

export const findLastFacultyID = async () => {
  const lastFaculty = await User.findOne({ role: 'faculty' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastFaculty?.id && lastFaculty.id.substring(2)
}

export const generateFacultyID = async (): Promise<string> => {
  const currentID =
    (await findLastFacultyID()) || (0).toString().padStart(5, '0')
  let incrementalID = (parseInt(currentID) + 1).toString().padStart(5, '0')
  incrementalID = `F-${incrementalID}`
  // console.log(incrementalID)

  return incrementalID
}

export const findLastAdminID = async () => {
  const lastAmdin = await User.findOne({ role: 'admin' }, { id: 1, _id: 0 })
    .sort({ createdAt: -1 })
    .lean()
  return lastAmdin?.id && lastAmdin.id.substring(2)
}

export const generateAdminID = async (): Promise<string> => {
  const currentID = (await findLastAdminID()) || (0).toString().padStart(5, '0')
  let incrementalID = (parseInt(currentID) + 1).toString().padStart(5, '0')
  incrementalID = `A-${incrementalID}`
  // console.log(incrementalID)

  return incrementalID
}
