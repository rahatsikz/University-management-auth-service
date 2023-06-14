import { Request, Response } from 'express'
import { UserService } from './user.service'
import { catchAsync } from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IUser } from './user.interface'

const createStudent = catchAsync(async (req: Request, res: Response) => {
  const { student, ...userData } = req.body
  const result = await UserService.createStudent(student, userData)
  // res.status(200).json({
  //   success: true,
  //   message: 'User Created successfully',
  //   data: result,
  // })
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Created successfully',
    data: result,
  })
})

const createFaculty = catchAsync(async (req: Request, res: Response) => {
  const { faculty, ...userData } = req.body
  const result = await UserService.createFaculty(faculty, userData)

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'faculty Created successfully',
    data: result,
  })
})

export const UserController = {
  createStudent,
  createFaculty,
}
