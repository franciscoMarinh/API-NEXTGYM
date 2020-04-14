// eslint-disable-next-line no-unused-vars
import { Response, NextFunction } from 'express'

interface Params {
  message: string;
  statusCode: number;
}

type SendResponse = (req: Response, next: NextFunction, data: object, params?: Params) => void | Response

export default class HttpController {
  public sendResponse: SendResponse = (res, next, data, params?) => {
    const { message = '', statusCode = 200 } = params || {}

    return res.status(statusCode).json({
      message,
      data
    })
  }
}
