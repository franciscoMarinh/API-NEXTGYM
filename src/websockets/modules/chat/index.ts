import { Socket } from 'socket.io'
import { ChatRoom } from '../../../database/entity/ChatRooms'

class ChatController {
  joinChatRoom(socket: Socket) {
    socket.join(socket.handshake.query.chatRoom)
    socket.on('message', (message) => {
      socket.to(socket.handshake.query.chatRoom).emit('message', message)
    })
  }
}

export default new ChatController()
