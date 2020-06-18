import { Request, Response, NextFunction } from 'express'

interface Payload {
  id: number
  email: string
  typeProfile: string
}

export interface UserRequest extends Request {
  user: Payload
}

export type PrivateRouter = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response>

export type PrivateRouterFunction = (
  req: UserRequest,
  res: Response,
  next: NextFunction
) => void | Response
