import { IGenericErrorMSG } from './error'

export type IGenericResponse = {
  statusCode: number
  message: string
  errorMessages: IGenericErrorMSG[]
}

export type IPaginationResponse<T> = {
  meta: {
    page: number
    limit: number
    total: number
  }
  data: T
}
