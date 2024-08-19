import { CustomError } from "../../../utils/CustomError";

import { Request, Response, NextFunction } from "express";


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('reaching the error handler')

  if (err.name == "PayloadTooLargeError" && err.message == "request entity too large") {
    return res.status(413).json({
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
    console.log(err.message,statusCode)
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

  return res.status(500).json({
    status: "Error",
    message: `Internal server error:${err.message}`
  })
}


export {
  errorHandler
}