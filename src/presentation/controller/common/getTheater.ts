import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";

const getTheater = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getTheaterUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { theaterId } = req.params
      const response = await getTheaterUsecase(dependencies).execute(theaterId);
      return res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data,
        redirectURL: response.redirectURL
      })
    } catch (error) {
      next(error)
    }
  }
}

export {
  getTheater
}