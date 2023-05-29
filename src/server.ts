import mongoose from 'mongoose'
import app from './app'
import config from './config/index'

async function mainFunc() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log('Database connected')
    app.listen(config.port, () => {
      console.log(`Application is listening on port ${config.port}`)
    })
  } catch (error) {
    console.log('error found', error)
  }
}

mainFunc()
