import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './api/modules/routes'
import morgan from 'morgan'
// import authMiddlware from './api/commons/middlewares/auth.middleware'
import 'reflect-metadata'
import { createConnection } from 'typeorm'
require('dotenv').config({
  path: '.env.local'
})

class AppController {
  public app: express.Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
    this.database()
  }

  private routes (): void {
    this.app.use(routes)
  }

  private middlewares (): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(morgan('tiny'))
    // this.app.use(authMiddlware)
  }

  private async database (): Promise<void> {
    try {
      await createConnection()
      console.log('Database connected!')
    } catch (error) {
      console.log('Database error on connection')
    }
  }
}

export default new AppController().app
