import jwt from 'jsonwebtoken'
import { Request, Response, NextFunction } from 'express'
import Promises from 'bluebird'

interface AuthRequest extends Request{
  user: {
    id: string;
    email: string;
  };
}

class AuthController {
  private extractHeaderFromRequest (req: Request): boolean | string {
    const { authorization } = req.headers
    if (!authorization) return false
    return authorization.split(' ')[1]
  }

  public authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void | Response> => {
    try {
      const token = this.extractHeaderFromRequest(req)
      if (!token) return res.sendStatus(401)
      const promise = Promises.promisify(jwt.verify)
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

export default new AuthController().authMiddleware
