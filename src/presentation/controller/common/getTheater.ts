import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";

const getTheater = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getTheaterUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, city } = req.params
      console.log('in get theater in common controler_id:', req.params)
      const response = await getTheaterUsecase(dependencies).execute(_id, city);
      return res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data,
      })
    } catch (error) {
      next(error)
    }
  }
}

export {
  getTheater
}