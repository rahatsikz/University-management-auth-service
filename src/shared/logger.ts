/* eslint-disable no-undef */
import { createLogger, format, transports } from 'winston'
import path from 'path'
import 'winston-daily-rotate-file'

const { combine, timestamp, label, printf } = format

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`
})

const logger = createLogger({
  level: 'info',
  format: combine(label({ label: 'Prac PH' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new transports.DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'successes',
        'phu-%DATE%-success.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})
const errorLogger = createLogger({
  level: 'error',
  format: combine(label({ label: 'Prac PH' }), timestamp(), myFormat),
  transports: [
    new transports.Console(),

    new transports.DailyRotateFile({
      filename: path.join(
        process.cwd(),
        'logs',
        'winston',
        'errors',
        'phu-%DATE%-error.log'
      ),
      datePattern: 'YYYY-DD-MM-HH',
      zippedArchive: true,
      maxSize: '20m',
      maxFiles: '14d',
    }),
  ],
})

export { logger, errorLogger }
