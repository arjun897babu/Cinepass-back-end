import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { validateEmail } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";

const resendOTP = (dependencies: IDependencies) => {
  const { useCases: { resendOTPUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body
        validateEmail(email)
      
      const response = await resendOTPUseCase(dependencies).execute(email)
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
  resendOTP
}