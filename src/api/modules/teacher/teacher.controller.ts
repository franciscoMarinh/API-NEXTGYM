import HttpController from '../../commons/controller/http.controller'
import { Teacher } from '../../../database/entity/Teachers'
import { User } from '../../../database/entity/Users'
import { PrivateRouter } from '../../../types/routes/privateRouter.type'
import { Training } from '../../../database/entity/Trainings'
import Queues from '../../../consumers/queues'
import teacherValidator from './teacher.validator'
import { getConnection } from 'typeorm'
import { JobsNames } from '../../../types/enums/jobs.enum'

class TeacherController extends HttpController {
  public register: PrivateRouter = async (req, res, next) => {
    try {
      teacherValidator.validateStudentParams(req.body)

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

      this.sendResponse(res, next, { students: result.student })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public createTraining: PrivateRouter = async (req, res, next) => {
    try {
      teacherValidator.validateTrainingParams(req.body)
      if (!req.params.studentId) throw new Error('Please send studentId')
      const { body } = req
      const training = new Training()
      training.description = body.description
      training.exerciseDate = body.exerciseDate
      training.urlYoutube = body.urlYoutube
      training.title = body.title
      training['student' as any] = req.params.studentId
      training['teacher' as any] = req.user.id
      await training.save()

      this.sendResponse(res, next, { training })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public allTrainings: PrivateRouter = async (req, res, next) => {
    try {
      const teacher = await Teacher.findOneOrFail({
        where: {
          user: { id: req.user.id },
        },
        relations: ['trannings', 'trannings.student'],
      })

      this.sendResponse(res, next, { teacher })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public removeTraining: PrivateRouter = async (req, res, next) => {
    try {
      if (req.params.trainingId) throw new Error('please send trainingId')
      await Training.delete({
        teacher: { id: req.user.id },
        id: parseInt(req.params.id),
      })

      this.sendResponse(res, next, { message: 'success!' })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public updateTraining: PrivateRouter = async (req, res, next) => {
    try {
      if (req.params.trainingId) throw new Error('please send trainingId')
      teacherValidator.validateTrainingUpdateParams(req.body)
      const { body } = req
      const training = await Training.findOneOrFail({
        where: {
          teacher: { id: req.user.id },
          id: req.params.trainingId,
        },
      })

      if (body.description) training.description = body.description
      if (body.exerciseDate) training.exerciseDate = body.exerciseDate
      if (body.urlYoutube) training.urlYoutube = body.urlYoutube
      if (body.title) training.title = body.title

      await training.save()

      this.sendResponse(res, next, { training })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new TeacherController()
