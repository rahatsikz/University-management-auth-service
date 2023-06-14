import express, { Application, NextFunction, Request, Response } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import routes from './app/routes'
import httpStatus from 'http-status'

// import ApiError from './errors/ApiError'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// route
app.use('/api/v1', routes)
// app.use('/api/v1/users', UserRoutes)
// app.use('/api/v1/academic-semesters', AcademicSemesterRoutes)
// eslint-disable-next-line no-console
// console.log(app.get('env'))

// test
app.get('/', async () => {
  // throw new ApiError(400, 'Error Ashse')
  // next('error ashse')
  // Promise.reject(new Error('Unhandled Promise Rejection'))
  // console.log(x)
  throw new Error('Uncaught exception detected')
})

// global error handler
app.use(globalErrorHandler)

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API not found',
    errorMessages: [{ Path: req.originalUrl, message: 'API not found' }],
  })
  next()
})

// const academicSemester: IAcademicSemester = {
//   title: 'Summer',
//   year: '2025',
//   code: '02',
//   startMonth: 'April',
//   endMonth: 'July',
// }

// const testID = async (academicSemester: IAcademicSemester) => {
//   const id = await generateStudentID(academicSemester)
//   // console.log(id)
//   return id
// }

// testID(academicSemester)

// const testFacultyID = async () => {
//   const id = await generateFacultyID()
//   return id
// }

// testFacultyID()
export default app
