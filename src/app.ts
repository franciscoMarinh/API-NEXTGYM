import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
// import authMiddlware from './api/commons/middlewares/auth.middleware'
import routes from './api/modules/routes'
import logger from './consumers/commons/utils/logger'
require('dotenv').config({
  path: '.env.local',
})

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
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(morgan('tiny'))
    // this.app.use(authMiddlware)
  }

  private async database(): Promise<void> {
    try {
      await createConnection()
      logger.info('Database connected')
    } catch (error) {
      logger.error('Database not connected')
    }
  }
}

export default new AppController().app
