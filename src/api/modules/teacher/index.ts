import BaseRouter from '../../commons/router/baseRouter'
import TeacherContoller from './teacher.controller'

class Teacher extends BaseRouter {
  public controller = TeacherContoller

  initialize(): void {
    this.post('/register', this.controller.register)
  }
}

export default new Teacher().getRouter()
