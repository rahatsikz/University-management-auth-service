import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRoute from '../src/app/modules/users/users.router'
const app: Application = express()

app.use(cors())

// parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// route
app.use('/api/v1/users', userRoute)

// test
app.get('/', async (req: Request, res: Response) => {
  res.send('working successfully')
})

export default app
