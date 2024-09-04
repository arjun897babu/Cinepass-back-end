import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";

const updateTheaterScreen = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { updateTheaterScreenUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id, screenId } = req.params;

      const { payload } = req.body;
 
      const response = await updateTheaterScreenUsecase(dependencies).execute(screenId, payload);
 

      return res.status(200).json({
        status: response.status,
        message: response.message,
        data: response.data,
      })

    } catch (error) {
      next(error)
    }
  }
}

export {
  updateTheaterScreen
}