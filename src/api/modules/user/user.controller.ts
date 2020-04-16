import { Request, Response, NextFunction } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { User } from '../../../database/entity/User'

class UserController extends HttpController {
  public getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const users = await User.find()
      this.sendResponse(res, next, users)
    } catch (error) {
      this.sendResponse(res, next, undefined, { statusCode: 500, message: error.message })
    }
  }

  public create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, password, email } = req.body
      const user = new User()
      user.name = name
      user.password = password
      user.email = email
      await user.save()
      const token = await user.generateUserToken()
      this.sendResponse(res, next, { user, token })
    } catch (error) {
      this.sendResponse(res, next, undefined, { statusCode: 500, message: error.message })
    }
  }

  public findByEmail = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { email, password } = req.body
      const user = await User.findByEmail(email, password)
      this.sendResponse(res, next, user)
    } catch (error) {
      this.sendResponse(res, next, undefined, { message: error.message, statusCode: 401 })
    }
  }
}

export default new UserController()