import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { HttpStatusCode, MovieType } from "../../../utils/enum";
import { validateMovieType } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";

const addMovie = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { addMovieUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { movieType } = req.params
      // Validate movieType
      validateMovieType(movieType)
      const filePath = req.file?.path
      if (movieType === MovieType.STREAM && !req.file) {
        throw new CustomError('please upload a movie file', HttpStatusCode.BAD_REQUEST, 'file')
      }

      const payload = req.body;

      const response = await addMovieUsecase(dependencies).execute(payload, movieType as MovieType, filePath)

      res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message,
        data: response.data,
        redirectURL: response.redirectURL
      })

    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}

export {
  addMovie
}