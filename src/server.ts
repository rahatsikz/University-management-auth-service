import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'
let server: Server

process.on('uncaughtException', err => {
  errorLogger.error(err)
  process.exit(1)
})

async function mainFunc() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info('Database connected')
    server = app.listen(config.port, () => {
      logger.info(`Application is listening on port ${config.port}`)
    })
  } catch (error) {
    errorLogger.error('error found', error)
  }

  process.on('unhandledRejection', err => {
    console.log('We Are closing the server...')

    if (server) {
      server.close(() => {
        errorLogger.error(err)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}

mainFunc()

process.on('SIGTERM', () => {
  logger.info('Sigterm is received')
  if (server) {
    server.close()
  }
})

// console.log(x)
