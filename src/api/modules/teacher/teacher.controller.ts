import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { Teacher } from '../../../database/entity/Teachers'

class TeacherController extends HttpController {
  public getProfile: RequestHandler = async (req, res, next) => {
    try {
      const { id } = req.user
      const teacher = await Teacher.findOne({ where: { id } })
      this.sendResponse(res, next, teacher)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public findByEmail: RequestHandler = async (req, res, next) => {
    try {
      const { email, password } = req.body
      const teacher = await Teacher.findByEmail(email, password)
      this.sendResponse(res, next, teacher)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 401,
      })
    }
  }

  public create: RequestHandler = async (req, res, next) => {
    try {
      const teacher = await Teacher.create(req.body)
      await teacher.save()
      this.sendResponse(res, next, { teacher })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public update: RequestHandler = async (req, res, next) => {
    try {
      const teacher = await Teacher.findOne({ where: { id } })
      await teacher.update(req.body)
      this.sendResponse(res, next, teacher)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new TeacherController()
