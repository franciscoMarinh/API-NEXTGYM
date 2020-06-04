import HttpController from '../../commons/controller/http.controller'
import { Student } from '../../../database/entity/Students'
import validateController from './student.validator'
import { RequestHandler } from 'express'
import { User } from '../../../database/entity/Users'
import { getConnection } from 'typeorm'
import Queues from '../../../consumers/queues'
import { JobsNames } from '../../../types/enums/jobs.enum'
class StudentController extends HttpController {
  public register: RequestHandler = async (req, res, next) => {
    try {
      validateController.validateParams(req.body)
      const { body } = req

      const user = User.create({
        name: body.name,
        password: body.password,
        email: body.email,
      })

      const student = Student.create({
        birthDate: body.birthDate,
        biography: body.biography,
      })

      student.user = user

      await getConnection().manager.save([user, student])
      Queues.addQueue(JobsNames.RegistrationMail, {
        user: {
          email: body.email,
          name: body.name,
        },
      })
      const token = await user.generateToken()
      this.sendResponse(res, next, { user, token })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new StudentController()
