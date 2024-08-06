import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { MovieType } from "../../../utils/enum";
import { CustomError } from "../../../utils/CustomError";
import { validateMovieType } from "../../../utils/validator";

const addMovie = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { addMovieUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { movieType } = req.params
      // Validate movieType
      validateMovieType(movieType)

      const payload = req.body;
       
      const response = await addMovieUsecase(dependencies).execute(payload, movieType as MovieType)

      res.status(200).json({
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
  addMovie
}