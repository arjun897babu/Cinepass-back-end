import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { HttpStatusCode } from "../../../utils/enum";
import { validatePeriod } from "../../../utils/FilterAndPagination";
import { mongodbIdValidator } from "../../../utils/validator";

const getCountStatics = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { entityStat } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const response = await entityStat(dependencies).execute()


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

const getMovieStatics = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { streamingMovieStat } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, roles } = req.body
      const movieId = req.query.movieId as string
      if (movieId !== undefined) {
        mongodbIdValidator(movieId)
      }

      const period = validatePeriod(req.query.period)
      const response = await streamingMovieStat(dependencies).execute({ movieId, period })

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

export { getCountStatics, getMovieStatics }