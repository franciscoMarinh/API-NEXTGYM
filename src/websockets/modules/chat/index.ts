import { Socket } from 'socket.io'
import { Message } from '../../../database/entity/Messages'

class ChatController {
  joinChatRoom(socket: Socket) {
    socket.join(socket.handshake.query.chatRoom)
    socket.on('message', async (message) => {
      socket.to(socket.handshake.query.chatRoom).emit('message', message)
      try {
        const messageDb = new Message()

        messageDb['author' as any] = { id: socket.handshake.query.user.id }
        messageDb['chat' as any] = { id: socket.handshake.query.chatRoom }
        messageDb.message = message

        await messageDb.save()
      } catch (error) {}
    })
  }
}

export default new ChatController()
