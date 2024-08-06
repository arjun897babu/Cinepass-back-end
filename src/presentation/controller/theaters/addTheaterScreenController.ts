import { nextTick } from "process";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { NextFunction, Request, Response } from "express";

const addTheaterScreen = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { createTheaterScreenUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      const { _id } = req.params;
     
      const response = await createTheaterScreenUsecase(dependencies).execute(_id, payload);
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
  addTheaterScreen
}