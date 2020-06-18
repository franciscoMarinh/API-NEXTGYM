import { Router, RequestHandler } from 'express'
import Async from '../middlewares/async.middleware'

export default class BaseRouter {
  private router: Router
  public controller: unknown
  constructor() {
    this.router = Router({ mergeParams: true })
  }

  get(
    path: string,
    fn: RequestHandler,
    ...midlewares: Array<RequestHandler>
  ): void {
    this.router.get(path, ...midlewares, Async(fn.bind(this.controller)))
  }

  post(
    path: string,
    fn: RequestHandler,
    ...midlewares: Array<RequestHandler>
  ): void {
    this.router.post(path, midlewares, Async(fn.bind(this.controller)))
  }

  put(
    path: string,
    fn: RequestHandler,
    ...midlewares: Array<RequestHandler>
  ): void {
    this.router.put(path, midlewares, Async(fn.bind(this.controller)))
  }

  delete(
    path: string,
    fn: RequestHandler,
    ...midlewares: Array<RequestHandler>
  ): void {
    this.router.delete(path, midlewares, Async(fn.bind(this.controller)))
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  initialize() {}

  getRouter() {
    this.initialize()
    return this.router
  }
}
