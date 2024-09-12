import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { HttpStatusCode, Role } from "../../../utils/enum";
import { CustomError } from "../../../utils/CustomError";
import { getPageNumber } from "../../../utils/FilterAndPagination";
//controller for get show details based on  role (theater owner[_id]  and user[city] )
const getAllMovieShows = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getShowsUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { roles, _id, city } = req.params
      const theaterId = req.query.theaterId
      const showId = req.query.showId
      const pageNumber = getPageNumber(req.query.pageNumber)
      if (typeof theaterId !== 'string' && theaterId !== undefined) {
        throw new CustomError('bad request', HttpStatusCode.BAD_REQUEST, 'bad request')
      }
      else if (typeof showId !== 'string' && showId !== undefined) {
        throw new CustomError('bad request', HttpStatusCode.BAD_REQUEST, 'bad request')
      }

      const response = await getShowsUsecase(dependencies).execute(
        {
          role: roles as Role,
          _id,
          city,
          theaterId, showId
        },

      )

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
  getAllMovieShows
}