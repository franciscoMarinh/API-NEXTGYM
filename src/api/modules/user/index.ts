import BaseRouter from '../../commons/router/baseRouter'
import userController from './user.controller'

class UserRouter extends BaseRouter {
  public controller = userController

  initialize(): void {
    this.get('/', this.controller.getAll)
    this.post('/', this.controller.create)
    this.post('/findbyemail', this.controller.findByEmail)
  }
}

export default new UserRouter().getRouter()
