import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { HttpStatusCode } from "../../../utils/enum";

const getUserData = (dependencies: IDependencies) => {
  const { useCases: { getUserProfileUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      const response = await getUserProfileUsecase(dependencies).execute(_id)
      return res.status(HttpStatusCode.OK).json({
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