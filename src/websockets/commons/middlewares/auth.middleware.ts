import { Socket } from 'socket.io'
import config from '../../../api/commons/config/auth.config'
import jwt from 'jsonwebtoken'
import Promises from 'bluebird'

type IsLogged = (socket: Socket, next: (Error?: Error) => void) => void
class SocketUtils {
  public isLogged: IsLogged = async (socket, next) => {
    try {
      const { token } = socket.handshake.query
      const getAsync = Promises.promisify(jwt.verify).bind(jwt)
      const decoded = await getAsync(token, config.publicKey)
      socket.handshake.query.user = decoded
      next()
    } catch (error) {
      next(new Error('Authentication error'))
    }
  }
}

export default new SocketUtils()
