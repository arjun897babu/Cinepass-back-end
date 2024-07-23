import { Router } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterController } from "../../../presentation/controller/theaters";
import { verifyTheaterOwner, verifyTheaterResetPasswordRequest } from "../middleware/theaterMiddleware";

const theaterRoutes = (dependencies: ITheaterDependencies) => {
  const theaterRouter = Router();

  const { signup, otpVerification, login, logout, forgotPassword, resetPassword,resendOTPTheaters,getTheaterDetails } = theaterController(dependencies)

  theaterRouter.route('/login').post(login);
  theaterRouter.route('/signup').post(signup);
  theaterRouter.route('/forgot-password').post(forgotPassword)
  theaterRouter.route('/otp-verification').post(otpVerification)
  theaterRouter.route('/reset-password/:token').put(verifyTheaterResetPasswordRequest, resetPassword)
  theaterRouter.route('/logout').post(verifyTheaterOwner,logout)
  theaterRouter.route('/resend-otp').post(resendOTPTheaters)
  theaterRouter.route('/get-theater').get(verifyTheaterOwner,getTheaterDetails)


  return theaterRouter
}


export {
  theaterRoutes
}