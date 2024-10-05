import { MulterError } from "multer";
import { CustomError } from "../../../utils/CustomError";

import { Request, Response, NextFunction } from "express";
import { HttpStatusCode } from "../../../utils/enum";


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('reaching the error handler')

  if (err instanceof MulterError) {
    if (err.code === 'LIMIT_FILE_SIZE') {
      return res.status(HttpStatusCode.CONTENT_TOO_LARGE).json({
        status: "Error",
        message: 'Size is too large',
        error: {
          error: "field",
          message: "Size is too large"
        }
      })
    }
  }

  if (err.name == "PayloadTooLargeError" && err.message == "request entity too large") {
    return res.status(HttpStatusCode.CONTENT_TOO_LARGE).json({
      status: "Error",
      message: 'Size is too large',
      error: {
        error: "field",
        message: "Size is too large"
      }
    })
  }

  if (err instanceof CustomError) {

    const statusCode = err.statusCode;
    const message = err.message
    console.log(err.message, statusCode)
    return res.status(statusCode).json({
      status: "Error",
      message,
      error: {
        error: err.field,
        message: message
      }
    })
  }

  console.log(err.message)

  return res.status(HttpStatusCode.INTERNAL_SERVER_ERROR).json({
    status: "Error",
    message: `something went wrong`,
    error: {
      error: 'password',
      message: 'something went wrong'
    }
  })
}


export {
  errorHandler
}