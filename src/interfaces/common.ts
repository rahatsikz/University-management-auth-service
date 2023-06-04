import { IGenericErrorMSG } from './error'

export type IGenericResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMSG[]
}
