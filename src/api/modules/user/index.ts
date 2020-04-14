import BaseRouter from '../../commons/router/baseRouter'
import userController from './user.controller'

class UserRouter extends BaseRouter {
  public controller = userController

  initialize (): void {
    this.get('/', this.controller.get)
    this.post('/', this.controller.post)
  }
}

export default new UserRouter().getRouter()
