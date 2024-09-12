import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { validateMovieType } from "../../../utils/validator";
import { HttpStatusCode, MovieType, Role } from "../../../utils/enum";
import { getPageNumber } from "../../../utils/FilterAndPagination";

//for get all the movies based on the movie type
const getMovies = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getMoviesUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {

    const { roles, id, movieType } = req.params
    const pageNumber  = getPageNumber(req.query.pageNumber)
    console.log(req.url)
    validateMovieType(movieType)

    try {
      const response = await getMoviesUsecase(dependencies).execute(movieType as MovieType, roles as Role,pageNumber);
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
  getMovies
}