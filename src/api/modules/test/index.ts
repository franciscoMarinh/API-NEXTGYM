import BaseRouter from '../../commons/router/baseRouter'
import testController from './test.controller'

class UserRouter extends BaseRouter {
  public controller = testController

  initialize(): void {
    this.get('/', this.controller.get)
  }
}

export default new UserRouter().getRouter()
