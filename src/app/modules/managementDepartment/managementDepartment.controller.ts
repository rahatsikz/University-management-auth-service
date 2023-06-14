import { Request, Response } from 'express'
import { catchAsync } from '../../../shared/catchAsync'
import sendResponse from '../../../shared/sendResponse'
import httpStatus from 'http-status'
import { IManagementDepartment } from './managementDepartment.interface'
import { ManagementDepartmentService } from './managementDepartment.service'
import pick from '../../../shared/pick'
import { managementDepartmentFilterableFields } from './managementDepartment.constant'
import { paginationFields } from '../../../constant/pagination'

const createManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const { ...ManagementDepartmentData } = req.body
    const result = await ManagementDepartmentService.createManagementDepartment(
      ManagementDepartmentData
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment Created successfully',
      data: result,
    })
  }
)

const getAllManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const filters = pick(req.query, managementDepartmentFilterableFields)
    const paginationOptions = pick(req.query, paginationFields)
    // console.log(paginationOptions)

    const result = await ManagementDepartmentService.getAllManagementDepartment(
      filters,
      paginationOptions
    )

    sendResponse<IManagementDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment retrieved successfully',
      meta: result.meta,
      data: result.data,
    })
  }
)

const getSingleManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id
    const result =
      await ManagementDepartmentService.getSingleManagementDepartment(id)

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'ManagementDepartment retrieved successfully',
      data: result,
    })
  }
)

const updateManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const { ...updatedData } = req.body
    const result = await ManagementDepartmentService.updateManagementDepartment(
      id,
      updatedData
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment updated successfully',
      data: result,
    })
  }
)

const deleteManagementDepartment = catchAsync(
  async (req: Request, res: Response) => {
    const id = req.params.id

    const result = await ManagementDepartmentService.deleteManagementDepartment(
      id
    )

    sendResponse<IManagementDepartment>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: ' ManagementDepartment deleted successfully',
      data: result,
    })
  }
)

export const ManagementDepartmentController = {
  createManagementDepartment,
  getAllManagementDepartment,
  getSingleManagementDepartment,
  updateManagementDepartment,
  deleteManagementDepartment,
}
