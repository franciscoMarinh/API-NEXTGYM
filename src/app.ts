import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import routes from './api/modules/routes'
import morgan from 'morgan'
import authMiddlware from './api/commons/middlewares/auth.middleware'
require('dotenv').config({
  path: '.env.container'
})

class AppController {
  public app: express.Application

  constructor () {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  private routes (): void {
    this.app.use(routes)
  }

  private middlewares (): void {
    this.app.use(cors())
    this.app.use(helmet())
    this.app.use(morgan('tiny'))
    // this.app.use(authMiddlware)
  }
}

export default new AppController().app
