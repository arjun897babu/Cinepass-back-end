import { NextFunction, Request, Response } from "express";

import { CustomError } from "../../../utils/CustomError";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { validatePassword } from "../../../utils/validator";
import { HttpStatusCode } from "../../../utils/enum";

const resetPasswordTheaters = (dependencies:ITheaterDependencies ) => {
  const { theaterUseCase: {theaterResetPasswordUsecase  } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      console.log(password)
      const { token } = req.params;// this token contain the _id of the user 
      if (!token) {
        throw new CustomError('Something went wrong', 400, '_id')
      }
      validatePassword(password as string)

      const response = await theaterResetPasswordUsecase(dependencies).execute({ _id: token, password })
      return res.status(HttpStatusCode.OK).json(
        {
          status: response.status,
          message: response.message,
          redirectURL:response.redirectURL
        }
      )

    } catch (error) {
      next(error)
    }
  }
}

export {
  resetPasswordTheaters
}