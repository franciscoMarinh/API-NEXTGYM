import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'

class HealthCheckController extends HttpController {
  public get: RequestHandler = async (req, res, next) => {
    const data = {
      hello: 'world',
    }
    this.sendResponse(res, next, data)
  }
}

export default new HealthCheckController()
