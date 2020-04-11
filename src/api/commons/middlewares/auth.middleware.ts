import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import bluebird from 'bluebird'

class AuthController {
  auth = async (req: Request, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const { authorization } = req.headers

      if (!authorization) return res.sendStatus(401)

      const [, token] = authorization.split(' ')

      const promise = bluebird.promisify(jwt.verify)
      const user = await promise(token, process.env.JWT_SECRET)
      req.user = {
        ...user
      }
      next()
    } catch (error) {
      next(error)
    }
  }
}

export default new AuthController().auth
