import { NextFunction, Request, Response } from "express";
import { CustomError } from "../../../utils/CustomError";
import { mongodbIdValidator, validateCity } from "../../../utils/validator";
import { IAdminDependencies } from "../../../application/interface/admin/IAdminDependencies";
import { HttpStatusCode, ResponseStatus } from "../../../utils/enum";;

const updateTheaterCity = (dependencies: IAdminDependencies) => {
  const { adminUsecase: { updateTheaterCityUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params
      const { city } = req.body

      mongodbIdValidator(_id);

      validateCity(city);
      
      const response = await updateTheaterCityUsecase(dependencies).execute({ _id, city });
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
  updateTheaterCity
}