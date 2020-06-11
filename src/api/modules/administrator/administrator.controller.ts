import HttpController from '../../commons/controller/http.controller'
import { PrivateRouter } from '../../../types/routes/privateRouter.type'
import { Teacher } from '../../../database/entity/Teachers'
import { User } from '../../../database/entity/Users'

class HealthCheckController extends HttpController {
  public getAllTeachers: PrivateRouter = async (req, res, next) => {
    try {
      const profile = await User.getProfile(req.user.id)
      if (!profile.administrator)
        throw new Error(`the user don't have permission`)
      const teachers = await Teacher.find({
        relations: ['user'],
      })

      this.sendResponse(res, next, { teachers })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 500,
      })
    }
  }

  public removeTeacher: PrivateRouter = async (req, res, next) => {
    try {
      const { teacherId } = req.params
      const profile = await User.getProfile(req.user.id)
      if (!profile.administrator)
        throw new Error(`the user don't have permission`)

      await User.delete(teacherId)
      this.sendResponse(res, next, { message: 'teacher deleted with success' })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        statusCode: 500,
        message: error.message,
      })
    }
  }
}

export default new HealthCheckController()
