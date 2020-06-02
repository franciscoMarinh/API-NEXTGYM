import { RequestHandler } from 'express'
import HttpController from '../../commons/controller/http.controller'
import { Teacher } from '../../../database/entity/Teachers'
import { PrivateRouter } from '../../types/privateRouter.type'
import Queues from '../../../consumers/queues'

class TeacherController extends HttpController {
  public getProfile: PrivateRouter = async (req, res, next) => {
    try {
      const teacher = await Teacher.findOne({ where: { id: req.user.id } })
      this.sendResponse(res, next, teacher)
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
      const student = await Teacher.findByEmail(email, password)
      const token = await student.generateToken()
      this.sendResponse(res, next, { token })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 401,
      })
    }
  }

  public register: RequestHandler = async (req, res, next) => {
    try {
      const { biography, birthDate, email, password, name, license } = req.body
      if (!email || !name || !password) {
        return this.sendResponse(res, next, undefined, {
          statusCode: 500,
        })
      }
      const teacher = new Teacher()
      teacher.biography = biography
      teacher.birthDate = birthDate
      teacher.email = email
      teacher.password = password
      teacher.name = name
      teacher.license = license
      teacher.typeProfile = 'teacher'
      await teacher.save()
      const Queue = Queues.getJob('RegistrationMail')
      await Queue.add({ user: { email, name } })
      const token = await teacher.generateToken()
      this.sendResponse(res, next, { teacher, token })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public update: PrivateRouter = async (req, res, next) => {
    try {
      this.sendResponse(res, next, { teacher: 'hello' })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new TeacherController()
