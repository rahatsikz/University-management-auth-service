'use strict'
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, '__esModule', { value: true })
exports.errorLogger = exports.logger = void 0
/* eslint-disable no-undef */
const winston_1 = require('winston')
const path_1 = __importDefault(require('path'))
require('winston-daily-rotate-file')
const { combine, timestamp, label, printf } = winston_1.format
const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp)
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return `${date.toDateString()} ${hour}:${minute}:${second} [${label}] ${level}: ${message}`
})
const logger = (0, winston_1.createLogger)({
  level: 'info',
  format: combine(label({ label: 'Prac PH' }), timestamp(), myFormat),
  transports: [
    new winston_1.transports.Console(),
    new winston_1.transports.DailyRotateFile({
      filename: path_1.default.join(
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
exports.logger = logger
const errorLogger = (0, winston_1.createLogger)({
  level: 'error',
  format: combine(label({ label: 'Prac PH' }), timestamp(), myFormat),
  transports: [
    new winston_1.transports.Console(),
    new winston_1.transports.DailyRotateFile({
      filename: path_1.default.join(
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
exports.errorLogger = errorLogger
