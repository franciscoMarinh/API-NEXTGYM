import BaseRouter from '../../commons/router/baseRouter'
import TeacherContoller from './teacher.controller'

class Teacher extends BaseRouter {
  public controller = TeacherContoller

  initialize(): void {
    this.get('/', this.controller.getProfile)
    this.post('/login', this.controller.login)
    this.post('/register', this.controller.register)
    this.put('/', this.controller.update)
  }
}

export default new Teacher().getRouter()
