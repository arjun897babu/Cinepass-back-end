import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";

const getAllTheaterScreen = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { getAllTheaterScreenUseCase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params
      const response = await getAllTheaterScreenUseCase(dependencies).execute(_id)
      return res.status(200).json({
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
  getAllTheaterScreen
}