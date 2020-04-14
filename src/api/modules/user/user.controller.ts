import { Request, Response, NextFunction } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { User } from '../../../database/entity/User'

class UserController extends HttpController {
  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const users = await User.find()
    this.sendResponse(res, next, users)
  }

  public post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name, password, email } = req.body
    const user = new User()
    user.name = name
    user.password = password
    user.email = email
    await user.save()
    this.sendResponse(res, next, user)
  }
}

export default new UserController()
