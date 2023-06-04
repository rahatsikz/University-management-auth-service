import mongoose from 'mongoose'
import app from './app'
import config from './config/index'
import { logger, errorLogger } from './shared/logger'
import { Server } from 'http'

async function mainFunc() {
  let server: Server

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
