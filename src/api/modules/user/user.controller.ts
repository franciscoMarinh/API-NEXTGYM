import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { Student } from '../../../database/entity/Students'

class UserController extends HttpController {
  public getAll: RequestHandler = async (req, res, next) => {
    try {
      const students = await Student.find()
      this.sendResponse(res, next, students)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public create: RequestHandler = async (req, res, next) => {
    try {
      const { name, password, email } = req.body
      const student = Student.create({
        email,
        password,
        name,
      })
      await student.save()
      const token = await student.generateUserToken()
      this.sendResponse(res, next, { student, token })
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
      const student = await Student.findByEmail(email, password)
      this.sendResponse(res, next, student)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 401,
      })
    }
  }
}

export default new UserController()
