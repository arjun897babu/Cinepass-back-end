import { NextFunction, query, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { HttpStatusCode, MovieFilterEnum, Role } from "../../../utils/enum";
import { toValidJSDate, validateFilterQueryString, validateNowShowingFilter } from "../../../utils/FilterAndPagination";

const getRunningMovies = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getRunningMoviesUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { roles, _id, city } = req.params
      let { movieId } = req.query

      const bookingDate = toValidJSDate(req.query.bookingDate);
      const nowShowing = validateNowShowingFilter(req.query.nowShowing)
      const format = validateFilterQueryString(req.query.format, MovieFilterEnum.FORMAT)
      const language = validateFilterQueryString(req.query.language, MovieFilterEnum.LANGUAGE)
      const genre = validateFilterQueryString(req.query.genre, MovieFilterEnum.GENRE)
      const search = validateFilterQueryString(req.query.search, MovieFilterEnum.SEARCH)
      movieId = typeof movieId === 'string' ?
        movieId
        : undefined

      const response = await getRunningMoviesUsecase(dependencies)
        .execute(
          {
            role: roles as Role,
            _id,
            city,
            movieId,
            filter:
            {
              nowShowing,
              bookingDate,
              format,
              language,
              genre,
              search
            }

          }
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
  getRunningMovies
}