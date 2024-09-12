import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"
import { validateMovieType } from "../../../utils/validator";
import { HttpStatusCode, MovieType } from "../../../utils/enum";

const deleteMovie = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { manangeMovieUsecase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {


    try {
      const { movieId, movieType } = req.params as { movieId: string, movieType: MovieType }
      validateMovieType(movieType);
      const response = await manangeMovieUsecase(dependencies).execute({ movieId, movieType })
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

export { deleteMovie }