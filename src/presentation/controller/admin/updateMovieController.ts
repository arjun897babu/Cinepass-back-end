import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { validateMovieType } from "../../../utils/validator";
import { HttpStatusCode, MovieType } from "../../../utils/enum";

const updateMovie = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { updateMovieUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { movieType, movieId } = req.params
      const { payload } = req.body
      console.log('update movie controller payload : ', payload)
      validateMovieType(movieType)

      const response = await updateMovieUsecase(dependencies).execute(movieId, payload, movieType as MovieType)
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
  updateMovie
}