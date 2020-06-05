import BaseRouter from '../../commons/router/baseRouter'
import ChatController from './chat.controller'

class HealthCheck extends BaseRouter {
  public controller = ChatController

  initialize(): void {
    this.get('/rooms', this.controller.getRooms)
    this.get('/room/:roomId', this.controller.getRoomMessages)
  }
}

export default new HealthCheck().getRouter()
