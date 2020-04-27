import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'

class TestController extends HttpController {
  public get: RequestHandler = async (req, res, next) => {
    const data = {
      nome: 'francisco',
      sobrenome: 'marinho',
      idade: 20,
    }
    this.sendResponse(res, next, data)
  }
}

export default new TestController()
