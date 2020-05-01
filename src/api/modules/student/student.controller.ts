import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { Student } from '../../../database/entity/Students'

class StudentController extends HttpController {
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
      const student = Student.create(req.body)
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

export default new StudentController()
