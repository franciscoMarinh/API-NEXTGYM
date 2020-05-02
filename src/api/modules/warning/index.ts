import BaseRouter from '../../commons/router/baseRouter'
import WarningController from './warning.controller'

class Warning extends BaseRouter {
  public controller = WarningController

  initialize(): void {
    this.get('/api/warning', this.controller.getAll)
    this.post('api/warning/post', this.controller.create)
  }
}

export default new Warning().getRouter()
