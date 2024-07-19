import { CustomError } from "../../../utils/CustomError";

import { Request, Response, NextFunction } from "express";


const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log('reaching the error handler')
  if (err instanceof CustomError) {
    
    const statusCode = err.statusCode;
    const message = err.message
    console.log(err.message)
    return res.status(statusCode).json({
      status: "Error",
      message,
      error:{
        error:err.field,
        message:message
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