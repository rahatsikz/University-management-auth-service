import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import { adminFilterableFields } from './admin.constant'
import { paginationFields } from '../../../constant/pagination'
import pick from '../../../shared/pick'
import { AdminService } from './admin.service'
import { IAdmin } from './admin.interface'
import httpStatus from 'http-status'
import sendResponse from '../../../shared/sendResponse'

const getAllAdmins = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, adminFilterableFields)
  const paginationOptions = pick(req.query, paginationFields)
  // console.log(paginationOptions)

  const result = await AdminService.getAllAdmins(filters, paginationOptions)

  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    meta: result.meta,
    data: result.data,
  })
})

const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AdminService.getSingleAdmin(id)
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin retrieved successfully',
    data: result,
  })
})

const updateAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const { ...updatedData } = req.body
  const result = await AdminService.updateAdmin(id, updatedData)

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin updated successfully',
    data: result,
  })
})

const deleteAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id

  const result = await AdminService.deleteAdmin(id)

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin deleted successfully',
    data: result,
  })
})

export const AdminController = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
}
