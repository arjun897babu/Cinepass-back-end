import { NextFunction, Request, Response } from "express";

import { CustomError } from "../../../utils/CustomError";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";

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
      if (!password || password === '') {
        throw new CustomError('please enter a password', 400, 'password')
      }

      const response = await theaterResetPasswordUsecase(dependencies).execute({ _id: token, password })
      return res.status(200).json(
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