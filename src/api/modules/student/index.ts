import BaseRouter from '../../commons/router/baseRouter'
import studentController from './student.controller'

class StudentRouter extends BaseRouter {
  public controller = studentController

  initialize(): void {
    this.get('/', this.controller.getProfile)
    this.post('/register', this.controller.register)
    this.post('/login', this.controller.login)
  }
}

export default new StudentRouter().getRouter()
