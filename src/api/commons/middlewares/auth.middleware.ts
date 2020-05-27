import jwt from 'jsonwebtoken'
import Promises from 'bluebird'
import HttpController from '../controller/http.controller'
import publicRoutes from '../constants/publicRoutes.constant'
import { Request } from 'express'
import {
  PrivateRouter,
  PrivateRouterFunction,
} from '../../types/privateRouter.type'

import config from '../config/auth.config'

class AuthController extends HttpController {
  private publicRoutes: Array<string>

  constructor() {
    super()
    this.publicRoutes = publicRoutes
  }

  private extractBearerFromHeader(req: Request): string {
    const { authorization } = req.headers
    if (!authorization) throw new Error('Please send token')
    const [, token] = authorization.split(' ')
    if (!token) throw new Error('Please send token')
    return token
  }

  private authMiddleware: PrivateRouter = async (req, res, next) => {
    try {
      const token = this.extractBearerFromHeader(req)
      const getAsync = Promises.promisify(jwt.verify).bind(jwt)
      const user = await getAsync(token, config.publicKey, config.configOptions)
      req.user = {
        email: user.email,
        id: user.id,
      }
      next()
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 401,
        message: error.message,
      })
    }
  }

  private authenticationHandler = (req, res, next) => {
    if (this.publicRoutes.indexOf(req.url) !== -1) {
      return next()
    } else {
      return this.authMiddleware(req, res, next)
    }
  }

  public initialize(): PrivateRouterFunction {
    return this.authenticationHandler
  }
}

export default new AuthController()
