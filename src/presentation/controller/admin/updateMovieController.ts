import { NextFunction, Request, Response } from "express";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { validateMovieType } from "../../../utils/validator";
import { HttpStatusCode, MovieType } from "../../../utils/enum";
import { CustomError } from "../../../utils/CustomError";
import { validatePublicId } from "../../../utils/FilterAndPagination";

const updateMovie = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { updateMovieUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { movieType, movieId } = req.params
      const payload = req.body
      if (movieType === MovieType.STREAM && !req.file && !payload.file) {
        throw new CustomError('please upload a movie file', HttpStatusCode.BAD_REQUEST, 'file')
      }
      
      const filePath = req.file?.path

      validateMovieType(movieType)

      let publicId: string | undefined
      if (filePath && !payload.file) {
        publicId = validatePublicId(req.query.publicId)
      }

      const response = await updateMovieUsecase(dependencies).execute(movieId, payload, movieType as MovieType, filePath, publicId)
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