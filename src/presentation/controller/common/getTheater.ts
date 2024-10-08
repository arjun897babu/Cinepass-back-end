import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { HttpStatusCode } from "../../../utils/enum";

const getTheater = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getTheaterUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, city } = req.params
       const response = await getTheaterUsecase(dependencies).execute(_id, city);
      return res.status(HttpStatusCode.OK).json({
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