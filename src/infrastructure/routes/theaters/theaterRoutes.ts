import { Router } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterController } from "../../../presentation/controller/theaters";
import { verifyTheaterOwner } from "../middleware/theaterMiddleware";

const theaterRoutes = (dependencies: ITheaterDependencies) => {
  const theaterRouter = Router();

  const { signup, otpVerification, login, logout, forgotPassword } = theaterController(dependencies)

  theaterRouter.route('/login').post(login);
  theaterRouter.route('/signup').post(signup);
  theaterRouter.route('/otp-verification').post(otpVerification)
  theaterRouter.route('/forgot-password').post(forgotPassword)
  theaterRouter.use(verifyTheaterOwner)
  theaterRouter.route('/logout').post(logout)


  return theaterRouter
}


export {
  theaterRoutes
}