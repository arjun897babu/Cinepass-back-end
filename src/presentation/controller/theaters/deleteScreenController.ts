import { NextFunction, Request, response, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { mongodbIdValidator } from "../../../utils/validator";
import { HttpStatusCode } from "../../../utils/enum";

const deleteScreen = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { deleteTheaterScreenUsecase } } = dependencies

  return async (req: Request, res: Response, next: NextFunction) => {
    try {

      const { screenId } = req.params
      mongodbIdValidator(screenId)
      const response = await deleteTheaterScreenUsecase(dependencies).execute(screenId)
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
  deleteScreen
}