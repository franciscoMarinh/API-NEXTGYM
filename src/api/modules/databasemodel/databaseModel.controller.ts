import { Request, Response, NextFunction } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { getConnection } from 'typeorm'
import { User } from '../../../database/entity/User'

class DatabaseModelController extends HttpController {
  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const connection = getConnection()
    const users = await connection.manager.find(User)
    this.sendResponse(res, next, users)
  }

  public post = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const connection = getConnection()
    const { firstName, lastName, age } = req.body
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.age = age
    await connection.manager.save(user)
    this.sendResponse(res, next, user)
  }
}

export default new DatabaseModelController()
