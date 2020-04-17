import { Request, Response, NextFunction } from 'express'
import HttpController from '../../commons/controller/http.controller'

type HandleRouter = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>

class HealthCheckController extends HttpController {
  public get: HandleRouter = async (req, res, next) => {
    const data = {
      hello: 'world',
    }
    this.sendResponse(res, next, data)
  }
}

export default new HealthCheckController()
