import { NextFunction, Request, Response } from "express";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { validateMovieType } from "../../../utils/validator";
import { MovieType, Role } from "../../../utils/enum";

//for get all the movies based on the movie type
const getMovies = (dependencies: ICommonDependencies) => {
  const { commonUsecases: { getMoviesUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {

    const { roles, id, movieType } = req.params
    validateMovieType(movieType)

    try {
      const response = await getMoviesUsecase(dependencies).execute(movieType as MovieType, roles as Role);
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
  getMovies
}