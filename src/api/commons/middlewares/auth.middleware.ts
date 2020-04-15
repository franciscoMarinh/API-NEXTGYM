import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import Promises from 'bluebird'
import HttpController from '../controller/http.controller'

interface AuthRequest extends Request{
  user: {
    id: string;
    email: string;
  };
}

class AuthController extends HttpController {
  public authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const { authorization } = req.headers
      if (!authorization) return res.sendStatus(401)
      const [, token] = authorization.split(' ')
      if (!token) return res.sendStatus(401)
      const getAsync = Promises.promisify(jwt.verify).bind(jwt)
      const user = await getAsync(token, process.env.JWT_SECRET)
      req.user = {
        email: user.email,
        id: user.id
      }
      next()
    } catch (error) {
      this.sendResponse(res, next, undefined, { statusCode: 401 })
    }
  }
}

export default new AuthController().authMiddleware
