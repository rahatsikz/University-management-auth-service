import mongoose from 'mongoose'
import { IGenericErrorMSG } from '../interfaces/error'

export const handleCastError = (error: mongoose.Error.CastError) => {
  const errors: IGenericErrorMSG[] = [
    {
      path: error?.path,
      message: 'Invalid ID',
    },
  ]

  const statusCode = 400

  return {
    statusCode,
    message: 'Cast Error',
    errorMessages: errors,
  }
}
