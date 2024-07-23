import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";

const getTheater = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      // const response = await 
      return res.send('working')

    } catch (error) {
      next(error)
    }
  }
}

export {
  getTheater
}