import { Socket } from 'socket.io'
import { ChatRoom } from '../../../database/entity/ChatRooms'

class ChatController {
  joinChatRoom(socket: Socket) {
    socket.join(socket.handshake.query.to)
    socket.on('message', (message) => {
      console.log(socket.handshake.query.user.id, 'id')
      socket.to(socket.handshake.query.to).emit('message', message)
    })
  }
}

export default new ChatController()
