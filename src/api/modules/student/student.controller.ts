import HttpController from '../../commons/controller/http.controller'
import { PrivateRouter } from '../../types/privateRouter.type'
import { Student } from '../../../database/entity/Students'
import Queues from '../../../consumers/queues'
import { RequestHandler } from 'express'

class StudentController extends HttpController {
  public getProfile: PrivateRouter = async (req, res, next) => {
    try {
      const student = await Student.findOne({ where: { id: req.user.id } })
      this.sendResponse(res, next, student)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public register: RequestHandler = async (req, res, next) => {
    try {
      const { email, biography, password, birthDate, name } = req.body
      if (!email || !name || !password) {
        return this.sendResponse(res, next, undefined, {
          statusCode: 500,
        })
      }
      const student = new Student()
      student.email = email
      student.biography = biography
      student.password = password
      student.birthDate = birthDate
      student.name = name
      await student.save()
      const Queue = Queues.getJob('RegistrationMail')
      await Queue.add({ user: { email, name } })
      const token = await student.generateToken()
      this.sendResponse(res, next, { student, token })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public login: PrivateRouter = async (req, res, next) => {
    try {
      const { email, password } = req.body
      const student = await Student.findByEmail(email, password)
      const token = await student.generateToken()
      this.sendResponse(res, next, { token })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 401,
      })
    }
  }
}

export default new StudentController()
