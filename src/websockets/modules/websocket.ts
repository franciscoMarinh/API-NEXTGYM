import io from 'socket.io'
import { Server } from 'http'
import authMiddleware from '../commons/middlewares/auth.middleware'
import chatRoomController from './chat'

class SocketController {
  private socket: io.Server
  private server: Server

  constructor(server: Server) {
    this.socket = io()
    this.server = server
    this.intialize()
  }

  private intialize(): void {
    this.socket.use(authMiddleware.isLogged)

    this.socket.attach(this.server, {
      serveClient: true,
      // below are engine.IO options
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
    })

    this.socket.on('connection', (socket) => {
      chatRoomController.joinChatRoom(socket)
    })
  }
}

function attachWebSocket(server: Server): void {
  // eslint-disable-next-line no-new
  new SocketController(server)
}

export default attachWebSocket
