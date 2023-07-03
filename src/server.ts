import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { Server } from 'http'
let server: Server

process.on('uncaughtException', err => {
  console.error(err)
  process.exit(1)
})

async function mainFunc() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database connected')
    server = app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`)
    })
  } catch (error) {
    console.error('error found', error)
  }

  process.on('unhandledRejection', err => {
    console.log('We Are closing the server...')

    if (server) {
      server.close(() => {
        console.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

mainFunc()

process.on('SIGTERM', () => {
  console.log('Sigterm is received')
  if (server) {
    server.close()
  }
})

// console.log(x)
