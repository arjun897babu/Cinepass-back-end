import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";

const getTheater = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { getTheaterDetailsUseCase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { _id } = req.params
      const response = await getTheaterDetailsUseCase(dependencies).execute(_id);
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
  getTheater
}