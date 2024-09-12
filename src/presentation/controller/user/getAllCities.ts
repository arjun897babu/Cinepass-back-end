import { NextFunction, Request, Response } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { HttpStatusCode } from "../../../utils/enum";

const getAllCities = (dependencies: IDependencies) => {
  const { useCases: { getAllCitiesUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const response = await getAllCitiesUsecase(dependencies).execute()
      
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
  getAllCities
}