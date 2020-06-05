import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'
import userValidator from './user.validator'
import { User } from '../../../database/entity/Users'
import { PrivateRouter } from '../../../types/routes/privateRouter.type'
import redis from '../../commons/services/redis.service'
import Promises from 'bluebird'
class StudentController extends HttpController {
  public getProfile: PrivateRouter = async (req, res, next) => {
    try {
      const profile = await User.getProfile(req.user.id)
      this.sendResponse(res, next, profile)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public login: RequestHandler = async (req, res, next) => {
    try {
      userValidator.validateParams(req.body)
      const { email, password } = req.body
      const user = await User.findByEmail(email, password)
      const token = await user.generateToken()
      this.sendResponse(res, next, { user, token })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 500,
      })
    }
  }

  public logOut: PrivateRouter = async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(' ')[1]
      const setAsync = Promises.promisify(redis.set).bind(redis)
      await setAsync(token, 0)
      const expireAsync = Promises.promisify(redis.expire).bind(redis)
      await expireAsync(token, 28800)
      this.sendResponse(res, next, { hello: 'world' })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 500,
      })
    }
  }
}

export default new StudentController()
