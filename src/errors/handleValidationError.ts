import mongoose from 'mongoose'
import { IGenericErrorMSG } from '../interfaces/error'
import { IGenericResponse } from '../interfaces/common'

export const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericResponse => {
  const errors: IGenericErrorMSG[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => {
      return {
        path: el?.path,
        message: el?.message,
      }
    }
  )

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
