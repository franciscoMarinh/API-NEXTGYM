import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { Warning } from '../../../database/entity/Warnings'

class WarningController extends HttpController {
  public getAll: RequestHandler = async (req, res, next) => {
    try {
      const warning = await Warning.find()
      this.sendResponse(res, next, warning)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public create: RequestHandler = async (req, res, next) => {
    try {
      const { tittle, description } = req.body
      const warning = await Warning.create({
        tittle,
        description,
      })
      await warning.save()
      // preciso passar algum token?
      this.sendResponse(res, next, { warning })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new WarningController()
