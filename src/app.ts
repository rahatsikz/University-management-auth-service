import express, { Application } from 'express'
import cors from 'cors'
import globalErrorHandler from './app/middleware/globalErrorHandler'
import { UserRoutes } from './app/modules/users/user.router'
// import ApiError from './errors/ApiError'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// route
app.use('/api/v1/users', UserRoutes)
// eslint-disable-next-line no-console
console.log(app.get('env'))

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

export default app
