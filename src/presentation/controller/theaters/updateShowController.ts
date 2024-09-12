import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { mongodbIdValidator } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";
import { HttpStatusCode } from "../../../utils/enum";

const updateShow = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { updateMovieShowUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, showId } = req.params
      const { payload } = req.body
      console.log('update movieshow controller',payload)
       if (!payload) {
        throw new CustomError('all fileds are required', 400, 'show')
      }
      mongodbIdValidator(showId)
      const response = await updateMovieShowUsecase(dependencies).execute(showId, payload)

      return res.status(HttpStatusCode.OK).json({
        status: response.status,
        message: response.message
      })

    } catch (error) {
      next(error)
    }
  }
}

export {
  updateShow
}