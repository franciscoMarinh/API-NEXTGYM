import BaseRouter from '../../commons/router/baseRouter'
import studentController from './student.controller'
import authMiddleware from '../../commons/middlewares/auth.middleware'

class StudentRouter extends BaseRouter {
  public controller = studentController

  initialize(): void {
    this.get('/', authMiddleware, this.controller.getProfile)
    this.post('/register', authMiddleware, this.controller.create)
    this.post('/login', authMiddleware, this.controller.login)
  }
}

export default new StudentRouter().getRouter()
