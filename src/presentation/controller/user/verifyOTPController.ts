import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { validateEmail } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";

const verifyOTP = (dependencies: IDependencies) => {
  const { useCases: { verifyOTPUseCase } } = dependencies;
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { email, otp } = req.body

      const emailValidation = validateEmail(email)
      if (!emailValidation.isValid) {
        throw new CustomError('Invalid email', 400, 'otp')
      }
      const result = await verifyOTPUseCase(dependencies).execute(email, otp);

      return res.status(200).json({
        status: result.status,
        message: result.message,
        redirectURL: result.redirectURL
      });

    } catch (error) {
      next(error)
    }
  }
};

export {
  verifyOTP
}
