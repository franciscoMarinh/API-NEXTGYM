import { Router } from 'express'
import Async from '../middlewares/async.middleware'

export default class BaseRouter {
  private router: Router
  public controller: any
  constructor () {
    this.router = Router({ mergeParams: true})
  }

  get(path, fn, ...midlewares): void {
    this.router.get(path, midlewares, Async(fn.bind(this.controller)))
  }

  post(path, fn, ...midlewares): void {
    this.router.post(path, midlewares, Async(fn.bind(this.controller)))
  }

  put(path, fn, ...midlewares): void {
    this.router.put(path, midlewares, Async(fn.bind(this.controller)))
  }

  delete(path, fn, ...midlewares): void {
    this.router.delete(path, midlewares, Async(fn.bind(this.controller)))
  }

  initialize() {}

  getRouter() {
    this.initialize()
    return this.router
  }
}
