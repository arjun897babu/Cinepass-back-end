import { Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { validateEmail } from "../../../utils/validator";
 import { HttpStatusCode } from "../../../utils/enum";

const verifyOTP = (dependencies: IDependencies) => {
  const { useCases: { verifyOTPUseCase } } = dependencies;
  
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { email, otp } = req.body

      validateEmail(email)
      
      const result = await verifyOTPUseCase(dependencies).execute(email, otp);

      return res.status(HttpStatusCode.OK).json({
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
