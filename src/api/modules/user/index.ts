import BaseRouter from '../../commons/router/baseRouter'
import userController from './user.controller'
import authMiddleware from '../../commons/middlewares/auth.middleware'

class UserRouter extends BaseRouter {
  public controller = userController

  initialize(): void {
    this.get('/', authMiddleware, this.controller.getAll)
    this.post('/', this.controller.create)
    this.post('/findbyemail', this.controller.findByEmail)
  }
}

export default new UserRouter().getRouter()
