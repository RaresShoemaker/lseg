import { ErrorRequestHandler, Request, Response, NextFunction } from 'express'
import httpStatus from 'http-status'

export const errorHandler = (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    let statusCode = 500
    if (err?.code) {
        statusCode = err.code
    }
    if (err?.statusCode) {
        statusCode = err.statusCode
    }

    let message = err.message

    res.locals.errorMessage = err.message

    const response = {
        code: statusCode,
        message,
    }

    res.status(statusCode).send(response)
}