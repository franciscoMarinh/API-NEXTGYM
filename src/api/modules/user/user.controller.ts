import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'
import userValidator from './user.validator'
import { User } from '../../../database/entity/Users'
import { PrivateRouter } from '../../../types/routes/privateRouter.type'
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
      this.sendResponse(res, next, { token })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 500,
      })
    }
  }
}

export default new StudentController()
