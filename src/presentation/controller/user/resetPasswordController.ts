import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { CustomError } from "../../../utils/CustomError";
import { validatePassword } from "../../../utils/validator";
import { HttpStatusCode } from "../../../utils/enum";

const resetPassword = (dependencies: IDependencies) => {
  const { useCases: { resetPasswordUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { password } = req.body;
      const { token, _id } = req.params  
      const response = await resetPasswordUsecase(dependencies).execute({ _id: token ?? _id, password })
      return res.status(HttpStatusCode.OK).json(
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