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
}

export default new StudentController()
