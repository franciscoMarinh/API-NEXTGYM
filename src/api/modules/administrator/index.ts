import BaseRouter from '../../commons/router/baseRouter'
import administratorController from './administrator.controller'

class Administrator extends BaseRouter {
  public controller = administratorController

  initialize(): void {
    this.get('/teachers', this.controller.getAllTeachers)
    this.delete('/teacher/:teacherId', this.controller.removeTeacher)
  }
}

export default new Administrator().getRouter()
