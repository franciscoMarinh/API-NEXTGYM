import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
import authMiddleware from './api/commons/middlewares/auth.middleware'
import routes from './api/modules/routes'
import logger from './consumers/commons/utils/logger'

class AppController {
  public app: express.Application

  constructor() {
    this.app = express()
    this.middlewares()
    this.routes()
    this.database()
  }

  private routes(): void {
    this.app.use(routes)
  }

  private middlewares(): void {
    this.app.use(cors())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(express.json())
    this.app.use(helmet())
    this.app.use(morgan('tiny'))
    this.app.use(authMiddleware.initialize())
  }

  private async database(): Promise<void> {
    try {
      await createConnection()
      logger.info('Database connected')
    } catch (error) {
      console.log(error.message)
      logger.error('Database not connected')
    }
  }
}

export default new AppController().app
