import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { validateEmail } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";

const theaterForgotPassword = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { theaterForgotPasswordUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body
      
      validateEmail(email);

      const response = await theaterForgotPasswordUsecase(dependencies).execute(email);

      return res.status(200).json({
        message: response.message,
        status: response.status,
        redirectURL: response.redirectURL,
        data: response.data
      })
    } catch (error) {
      next(error)
    }
  }
}
export {
  theaterForgotPassword
}