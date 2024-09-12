import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies"; 
import { HttpStatusCode } from "../../../utils/enum";

const updateProfile = (dependencies: IDependencies) => {
  const { useCases: { updateUserProfileUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      const { payload } = req.body
      const response = await updateUserProfileUsecase(dependencies).execute(_id,payload)
      return res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        data: response.data
      })
    } catch (error) {
      next(error)
    }
  }
};

export {
  updateProfile
}