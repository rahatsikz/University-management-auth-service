/* eslint-disable no-unused-expressions */
/* eslint-disable no-console */
import { ErrorRequestHandler } from 'express'
import config from '../../config'
import { IGenericErrorMSG } from '../../interfaces/error'
import { handleValidationError } from '../../errors/handleValidationError'
import ApiError from '../../errors/ApiError'
import { ZodError } from 'zod'
import { handleZodError } from '../../errors/handleZodError'
import { handleCastError } from '../../errors/handleCastError'

// eslint-disable-next-line no-unused-vars
const globalErrorHandler: ErrorRequestHandler = (err, req, res, next) => {
  // res.status(400).json({ MyError: err })

  config.env === 'Development'
    ? console.log('🚀 globalErrorHandler ~ ', err)
    : console.error('🚀 globalErrorHandler ~ ', err)

  let statusCode = 500
  let message = `Something went Wrong`
  let errorMessages: IGenericErrorMSG[] = []

  if (err.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err.name === 'CastError') {
    // res.status(200).json(err)
    const simplifiedError = handleCastError(err)
    statusCode = simplifiedError.statusCode
    message = simplifiedError.message
    errorMessages = simplifiedError.errorMessages
  } else if (err instanceof ApiError) {
    statusCode = err.statusCode
    message = err.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  } else if (err instanceof Error) {
    message = err?.message
    errorMessages = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : []
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.env !== 'production' ? err?.stack : undefined,
  })
}

export default globalErrorHandler
