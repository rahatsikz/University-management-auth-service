import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import pick from '../../../shared/pick'
import { facultyFilterableFields } from './faculty.constant'
import { paginationFields } from '../../../constant/pagination'
import { FacultyService } from './faculty.service'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IFaculty } from './faculty.interface'

const getAllFaculties = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, facultyFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(paginationOptions)

  const result = await FacultyService.getAllFaculties(
    filters,
    paginationOptions
  )

  sendResponse<IFaculty[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await FacultyService.getSingleFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student retrieved successfully',
    data: result,
  })
})

const deleteFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await FacultyService.deleteFaculty(id)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student deleted successfully',
    data: result,
  })
})

const updateFaculty = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const { ...updatedData } = req.body
  const result = await FacultyService.updateFaculty(id, updatedData)

  sendResponse<IFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student updated successfully',
    data: result,
  })
})

export const FacultyController = {
  getAllFaculties,
  getSingleFaculty,
  deleteFaculty,
  updateFaculty,
}
