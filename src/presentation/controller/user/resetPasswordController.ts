import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { CustomError } from "../../../utils/CustomError";

const resetPassword = (dependencies: IDependencies) => {
  const { useCases: { resetPasswordUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { password } = req.body;
      const { token } = req.params;// this token contain the _id of the user 
      if (!token) {
        throw new CustomError('Something went wrong', 400, 'password')
      }
      if (!password || password === '') {
        throw new CustomError('please enter a password', 400, 'password')
      }

      const response = await resetPasswordUsecase(dependencies).execute({ _id: token, password })
      return res.status(200).json(
        {
          status: response.status,
          message: response.message
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