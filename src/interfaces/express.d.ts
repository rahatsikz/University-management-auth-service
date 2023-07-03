/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { JwtPayload } from 'jsonwebtoken'

declare module 'express-serve-static-core' {
  interface Request {
    user: JwtPayload | null
  }
}
