import BaseRouter from '../../commons/router/baseRouter'
import DatabaseModelController from './databaseModel.controller'

class DatabaseModel extends BaseRouter {
  public controller = DatabaseModelController

  initialize (): void {
    this.get('/', this.controller.get)
    this.post('/', this.controller.post)
  }
}

export default new DatabaseModel().getRouter()
