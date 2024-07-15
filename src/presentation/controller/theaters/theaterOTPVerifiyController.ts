import { NextFunction, Request, Response } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies"
import { validateEmail } from "../../../utils/validator";
import { CustomError } from "../../../utils/CustomError";


const theaterVerify = (dependencies: ITheaterDependencies) => {
  const { theaterUseCase: { verifyTheaterOTPUsecase } } = dependencies;
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = req.body;
      //validate email 
      const emailValidaton = validateEmail(payload.email);
      if (!emailValidaton.isValid) {
        throw new CustomError('Invalid email', 400, 'email');
      }
      const response = await verifyTheaterOTPUsecase(dependencies).execute(payload);

      return res.status(200).json({
        status: response?.status,
        message: response?.message,
        redirectURL: response?.redirectURL
      })
    } catch (error) {
      next(error)
    }
  }
};

export{
  theaterVerify
}