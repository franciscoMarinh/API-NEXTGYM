import { PrivateRouter } from '../../../types/routes/privateRouter.type'
import HttpController from '../../commons/controller/http.controller'
import { ChatRoom } from '../../../database/entity/ChatRooms'
import { Message } from '../../../database/entity/Messages'
import { User } from '../../../database/entity/Users'

class ChatController extends HttpController {
  public getRooms: PrivateRouter = async (req, res, next) => {
    try {
      const user = await User.getProfile(req.user.id)
      let chatRooms

      if (user.teacher) {
        chatRooms = await ChatRoom.find({
          where: {
            teacher: {
              id: user.teacher.id,
            },
          },
        })
      } else if (user.student) {
        chatRooms = await ChatRoom.findOne({
          where: {
            student: {
              id: user.student.id,
            },
          },
        })
      }
      this.sendResponse(res, next, chatRooms)
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 500,
      })
    }
  }

  public getRoomMessages: PrivateRouter = async (req, res, next) => {
    try {
      if (!req.params.roomId)
        throw new Error('Please send room id to get messages')

      const messages = await Message.find({
        where: {
          chat: {
            id: req.params.roomId,
          },
        },
      })

      this.sendResponse(res, next, { messages })
    } catch (error) {
      this.sendResponse(res, next, undefined, {
        message: error.message,
        statusCode: 500,
      })
    }
  }
}

export default new ChatController()
