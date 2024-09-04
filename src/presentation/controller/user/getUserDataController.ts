import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";

const getUserData = (dependencies: IDependencies) => {
  const { useCases: { getUserProfileUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      const response = await getUserProfileUsecase(dependencies).execute(_id)
      return res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data
      })
    } catch (error) {
      next(error)
    }
  }
}

export {
  getUserData
}