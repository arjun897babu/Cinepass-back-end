import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { validateAddress, validateCity, validateImage, validateTheaterLicense, validateTheaterName } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";
import { HttpStatusCode } from "../../../utils/enum";

const updateTheaterInfo = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { updateTheaterInfoUsecase } } = dependencies
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      console.log(_id)
      const payload = req.body;

      // validateImage(payload.images);

      const response = await updateTheaterInfoUsecase(dependencies).execute(_id, payload);

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
};

export {
  updateTheaterInfo
}