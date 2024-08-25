import { NextFunction, Request, response, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";

const deleteMovieShow = (dependecies: ITheaterDependencies) => {
  const { theaterUseCase: { deleteMovieShowUsecase } } = dependecies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { showId } = req.params

      const response = await deleteMovieShowUsecase(dependecies).execute(showId)

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

export {
  deleteMovieShow
}