import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";
import { validateEmail } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";

const resendOTPTheaters = (dependencies: ITheaterDependencies) => {

  const { theaterUseCase: { resendOTPTheaterUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body
      
        validateEmail(email)
     
      const response = await resendOTPTheaterUsecase(dependencies).execute(email)
      
      return res.status(200).json({
        message: response.message,
        status: response.status,
        redirectURL: response.redirectURL
      })
    } catch (error) {
      next(error)
    }
  }

}

export {
  resendOTPTheaters
}