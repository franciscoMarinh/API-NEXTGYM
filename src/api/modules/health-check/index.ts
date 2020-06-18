import BaseRouter from '../../commons/router/baseRouter'
import HealthCheckController from './health-check.controller'

class HealthCheck extends BaseRouter {
  public controller = HealthCheckController

  initialize(): void {
    this.get('/', this.controller.get)
  }
}

export default new HealthCheck().getRouter()
