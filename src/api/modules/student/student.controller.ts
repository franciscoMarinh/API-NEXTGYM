import HttpController from '../../commons/controller/http.controller'
import { Student } from '../../../database/entity/Students'
import validateController from './student.validator'
import { User } from '../../../database/entity/Users'
import { Teacher } from '../../../database/entity/Teachers'
import { getConnection } from 'typeorm'
import Queues from '../../../consumers/queues'
import { JobsNames } from '../../../types/enums/jobs.enum'
import { PrivateRouter } from '../../../types/routes/privateRouter.type'
import { ChatRoom } from '../../../database/entity/ChatRooms'
import { Training } from '../../../database/entity/Trainings'

class StudentController extends HttpController {
  public register: PrivateRouter = async (req, res, next) => {
    try {
      validateController.validateParams(req.body)
      const { body } = req

      const teacher = await Teacher.getTeacherProfile(req.user.id)

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
      student.teacher = teacher

      const chatRoom = new ChatRoom()

      chatRoom.student = student
      chatRoom.teacher = teacher

      await getConnection().manager.save([user, student, chatRoom])

      Queues.addQueue(JobsNames.RegistrationMail, {
        user: {
          email: body.email,
          name: body.name,
        },
      })

      this.sendResponse(res, next, { user })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }

  public getAllTrainings: PrivateRouter = async (req, res, next) => {
    try {
      const trainings = await Training.find({
        where: {
          student: { id: req.user.id },
        },
      })
      if (!trainings) {
        return this.sendResponse(
          res,
          next,
          {},
          {
            message: `you don't have training please enter in contact with you teacher`,
            statusCode: 200,
          }
        )
      }
      this.sendResponse(res, next, { trainings })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new StudentController()
