import { PrivateRouter } from '../../../types/routes/privateRouter.type'
import HttpController from '../../commons/controller/http.controller'
import { ChatRoom } from '../../../database/entity/ChatRooms'
import { Messages } from '../../../database/entity/Messages'

class ChatController extends HttpController {
  public studentMessages: PrivateRouter = async (req, res, next) => {
    const { teacherId } = req.query

    const room = await ChatRoom.findOne({
      where: {
        teacherId,
        studentId: req.user.id,
      },
      relations: ['messages'],
    })

    this.sendResponse(res, next, room)
  }

  private getStudentRoom = async (id: number, teacherId: number) => {
    let chatRoom = await ChatRoom.findOne({
      where: {
        studentId: id,
      },
    })

    if (!chatRoom) {
      chatRoom = new ChatRoom()
      chatRoom.studentId = id
      chatRoom.teacherId = teacherId
      await chatRoom.save()
    }
    return chatRoom.id
  }

  private makeTeacherConnection = async (id: number, studentId: number) => {
    let chatRoom = await ChatRoom.findOne({
      where: {
        teacherId: id,
      },
    })

    if (!chatRoom) {
      chatRoom = new ChatRoom()
      chatRoom.teacherId = id
      chatRoom.studentId = studentId
      await chatRoom.save()
    }
    return chatRoom.id
  }

  public teacherRooms: PrivateRouter = async (req, res, next) => {
    const rooms = await ChatRoom.find({
      where: {
        teacherId: req.user.id,
      },
    })

    this.sendResponse(res, next, rooms)
  }
}

export default new ChatController()
