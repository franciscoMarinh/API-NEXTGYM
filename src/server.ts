import app from './app'
import http from 'http'
import attachWebSocket from './websockets/modules/websocket'

const server = http.createServer(app)

attachWebSocket(server)

server.listen(process.env.PORT || 3000)
