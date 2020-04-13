import app from './app'
import http from 'http'
import 'reflect-metadata'

const server = http.createServer(app)

server.listen(3000)
