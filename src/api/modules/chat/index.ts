import BaseRouter from '../../commons/router/baseRouter'
import ChatController from './chat.controller'

class HealthCheck extends BaseRouter {
  public controller = ChatController

  initialize(): void {
    this.get('/teacher/rooms', this.controller.teacherRooms)
    this.get('/student/messages', this.controller.studentMessages)
  }
}

export default new HealthCheck().getRouter()
