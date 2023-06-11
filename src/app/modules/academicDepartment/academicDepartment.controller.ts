import httpStatus from 'http-status'
import { catchAsync } from '../../../shared/catchAsync'
import { Request, Response } from 'express'
import { AcademicDepartmentService } from './academicDepartment.service'
import sendResponse from '../../../shared/sendResponse'
import { IAcademicDepartment } from './academicDepartment.interface'
import pick from '../../../shared/pick'
import { academicDepartmentFilterableFields } from './academicDepartment.constant'
import { paginationFields } from '../../../constant/pagination'

const createDepartment = catchAsync(async (req: Request, res: Response) => {
  const { ...academicDepartmentData } = req.body
  const result = await AcademicDepartmentService.createDepartment(
    academicDepartmentData
  )
  // res.status(200).json({
  //   success: true,
  //   message: 'Academic Department Created successfully',
  //   data: result,
  // })
  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department Created successfully',
    data: result,
  })
})

const getAllDepartments = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, academicDepartmentFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(paginationOptions)

  const result = await AcademicDepartmentService.getAllDepartments(
    filters,
    paginationOptions
  )

  sendResponse<IAcademicDepartment[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Departments retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id
  const result = await AcademicDepartmentService.getSingleDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic Department retrieved successfully',
    data: result,
  })
})

const updateDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const { ...updatedData } = req.body
  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updatedData
  )

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academy Department updated successfully',
    data: result,
  })
})

const deleteDepartment = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AcademicDepartmentService.deleteDepartment(id)

  sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academy Department deleted successfully',
    data: result,
  })
})

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartments,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
}
