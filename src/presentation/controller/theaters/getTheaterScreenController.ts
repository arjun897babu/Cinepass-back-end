import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { HttpStatusCode } from "../../../utils/enum";

const getAllTheaterScreen = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { getAllTheaterScreenUseCase } } = dependencies;

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params
      const { amenity } = req.query;
      const parsedAmenity = (amenity === '' || amenity === 'undefined') ? undefined : amenity as string;

      const response = await getAllTheaterScreenUseCase(dependencies).execute(_id, parsedAmenity);
      
      return res.status(HttpStatusCode.OK).json({
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