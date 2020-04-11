import { Request, Response, NextFunction } from 'express'
import HttpController from '../../commons/controller/http.controller'

class HealthCheckController extends HttpController {
  public get = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const data = {
      hello: 'world'
    }
    this.sendResponse(res, next, data)
  }
}

export default new HealthCheckController()
