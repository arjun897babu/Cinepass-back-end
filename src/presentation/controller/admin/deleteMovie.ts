import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies"
import { validateMovieType } from "../../../utils/validator";
import { MovieType } from "../../../utils/enum";

const deleteMovie = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { manangeMovieUsecase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {


    try {
      const { movieId, movieType } = req.params as { movieId: string, movieType: MovieType }
      validateMovieType(movieType);
      const response = await manangeMovieUsecase(dependencies).execute({ movieId, movieType })
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

export { deleteMovie }