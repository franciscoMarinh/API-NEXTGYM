import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import Promises from 'bluebird'
import HttpController from '../controller/http.controller'

interface AuthRequest extends Request {
  user: {
    id: string
    email: string
  }
}

type AuthMiddleware = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => Promise<void | Response>

class AuthController extends HttpController {
  public authMiddleware: AuthMiddleware = async (req, res, next) => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.sendStatus(401)
      const [, token] = authorization.split(' ')
      if (!token) return res.sendStatus(401)
      const getAsync = Promises.promisify(jwt.verify).bind(jwt)
      const user = await getAsync(token, process.env.JWT_SECRET)
      req.user = {
        email: user.email,
        id: user.id,
      }
      return next()
    } catch (error) {
      return this.sendResponse(res, next, undefined, {
        statusCode: 401,
        message: error.message,
      })
    }
  }
}

export default new AuthController().authMiddleware
