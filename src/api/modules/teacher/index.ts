import BaseRouter from '../../commons/router/baseRouter'
import TeacherContoller from './teacher.controller'

class Teacher extends BaseRouter {
  public controller = TeacherContoller

  initialize(): void {
    this.post('/register', this.controller.register)
    this.get('/students', this.controller.getStudents)
    this.get('/trainings', this.controller.allTrainings)
    this.post('/training/create', this.controller.createTraining)
    this.delete('/training/remove/:trainingId', this.controller.removeTraining)
    this.put('/training/update/:trainingId', this.controller.updateTraining)
  }
}

export default new Teacher().getRouter()
