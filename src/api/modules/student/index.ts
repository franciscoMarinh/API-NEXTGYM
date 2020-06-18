import BaseRouter from '../../commons/router/baseRouter'
import studentController from './student.controller'

class StudentRouter extends BaseRouter {
  public controller = studentController

  initialize(): void {
    this.post('/register', this.controller.register)
  }
}

export default new StudentRouter().getRouter()
