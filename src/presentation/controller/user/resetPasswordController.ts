import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { CustomError } from "../../../utils/CustomError";
import { validatePassword } from "../../../utils/validator";

const resetPassword = (dependencies: IDependencies) => {
  const { useCases: { resetPasswordUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { password } = req.body;
      const { token, _id } = req.params  
      const response = await resetPasswordUsecase(dependencies).execute({ _id: token ?? _id, password })
      return res.status(200).json(
        {
          status: response.status,
          message: response.message,
          redirectURL: response.redirectURL
        }
      )

    } catch (error) {
      next(error)
    }
  }
}

export {
  resetPassword
}