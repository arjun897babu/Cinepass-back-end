import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { Role } from "../../../utils/enum";

const getAllMovieShows = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getShowsUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roles, _id, city } = req.params

  

      const response = await getShowsUsecase(dependencies).execute({ role: roles as Role, _id, city })
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
  getAllMovieShows
}