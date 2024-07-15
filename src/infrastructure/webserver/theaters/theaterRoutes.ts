import { Router } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterController } from "../../../presentation/controller/theaters";

const theaterRoutes = (dependencies: ITheaterDependencies) => {
  const theaterRouter = Router();

  const { signup, otpVerification, login } = theaterController(dependencies)

  theaterRouter.route('/login').post(login);
  theaterRouter.route('/signup').post(signup);
  theaterRouter.route('/otp-verification').post(otpVerification)


  return theaterRouter
}


export {
  theaterRoutes
}