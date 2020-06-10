import HttpController from '../../commons/controller/http.controller'
import { Teacher } from '../../../database/entity/Teachers'
import { User } from '../../../database/entity/Users'
import { PrivateRouter } from '../../../types/routes/privateRouter.type'
import Queues from '../../../consumers/queues'
import teacherValidator from './teacher.validator'
import { getConnection } from 'typeorm'
import { JobsNames } from '../../../types/enums/jobs.enum'

class TeacherController extends HttpController {
  public register: PrivateRouter = async (req, res, next) => {
    try {
      teacherValidator.validateParams(req.body)

      const profile = await User.getProfile(req.user.id)
      if (!profile.administrator)
        throw new Error(`the user don't have permission`)

      const { body } = req

      const user = User.create({
        name: body.name,
        email: body.email,
        password: body.password,
      })

      const teacher = Teacher.create({
        biography: body.biography,
        birthDate: body.birthDate,
        license: body.license,
      })

      user.teacher = teacher

      const connection = getConnection()
      await connection.manager.save([user, teacher])

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

  public getStudents: PrivateRouter = async (req, res, next) => {
    try {
      const result = await Teacher.findOneOrFail({
        where: {
          user: { id: req.user.id },
        },
        relations: ['student', 'student.user', 'student.chatRoom'],
      })

      this.sendResponse(res, next, { students: result })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new TeacherController()
