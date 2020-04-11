import express from 'express'
import * as fs from 'fs'
import * as path from 'path'

class RouterController {
  public routes: express.Router
  public pathFolder: string

  constructor () {
    this.routes = express.Router()
    this.pathFolder = path.join(__dirname)
    this.applyAllRoutes()
  }

  private isDirectory (path: string): boolean {
    return fs.lstatSync(`${this.pathFolder}/${path}`).isDirectory()
  }

  private applyAllRoutes (): void {
    fs.readdirSync(this.pathFolder).forEach((folder) => {
      if (this.isDirectory(folder)) {
        const routeName = folder.replace(/-|\.|\s/g, '')
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        this.routes.use(`/api/${routeName}`, require(`./${folder}`).default)
      }
    })
  }
}

export default new RouterController().routes
