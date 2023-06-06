import { ZodError, ZodIssue } from 'zod'
import { IGenericErrorMSG } from '../interfaces/error'
import { IGenericResponse } from '../interfaces/common'

export const handleZodError = (err: ZodError): IGenericResponse => {
  const errors: IGenericErrorMSG[] = err.issues.map((issue: ZodIssue) => {
    {
      return {
        path: issue?.path[issue.path.length - 1],
        message: issue?.message,
      }
    }
  })

  const statusCode = 400

  return {
    statusCode,
    message: 'Validation Error',
    errorMessages: errors,
  }
}
