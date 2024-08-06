import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { IMovieShow } from "../../../domain/entities/theaters";
 
const addMovieShow = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { addMovieShowUsecase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { _id } = req.params
      const  payload  = req.body
      console.log('in controller')
      console.log(req.body)
      const response = await addMovieShowUsecase(dependencies).execute(_id, payload )
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
  addMovieShow
}