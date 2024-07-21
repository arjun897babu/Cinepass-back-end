import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies"

  ;
import { validateEmail } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";

const forgotPassword = (dependencies: IDependencies) => {
  const { useCases: { forgotPasswordUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email } = req.body;
      const emailValidation = validateEmail(email);
      if (!emailValidation.isValid) {
        throw new CustomError('Invalid Email', 400, 'email')
      }
      const response = await forgotPasswordUsecase(dependencies).execute(email);


      res.status(200).json({
        message:response.message,
        status:response.status,
        redirectURL:response.redirectURL
      })
    } catch (error) {
      next(error)
    }
  }
}

export {
  forgotPassword
}