import BaseRouter from '../../commons/router/baseRouter'
import userController from './user.controller'

class StudentRouter extends BaseRouter {
  public controller = userController

  initialize(): void {
    this.post('/login', this.controller.login)
    this.get('/', this.controller.getProfile)
  }
}

export default new StudentRouter().getRouter()
