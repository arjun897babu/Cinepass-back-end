import { Router } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterController } from "../../../presentation/controller/theaters";
import { verifyTheaterOwner, verifyTheaterResetPasswordRequest } from "../middleware/theaterMiddleware";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { commonController } from "../../../presentation/controller/common";

const theaterRoutes = (dependencies: ITheaterDependencies, commonDependencies: ICommonDependencies) => {
  const theaterRouter = Router();

  const { signup, otpVerification, login, logout, forgotPassword, resetPassword, resendOTPTheaters, getTheaterDetails, updateTheaterInfo, addScreen, getAllTheaterScreen, addMovieShow } = theaterController(dependencies);

  const { getTheaterScreen, getMovies, getShows, getRunningMovies } = commonController(commonDependencies);

  theaterRouter.route('/login').post(login);
  theaterRouter.route('/signup').post(signup);
  theaterRouter.route('/forgot-password').post(forgotPassword)
  theaterRouter.route('/otp-verification').post(otpVerification)
  theaterRouter.route('/reset-password/:token').put(verifyTheaterResetPasswordRequest, resetPassword)
  theaterRouter.route('/logout').post(verifyTheaterOwner, logout)
  theaterRouter.route('/resend-otp').post(resendOTPTheaters)
  theaterRouter.route('/theater').get(verifyTheaterOwner, getTheaterDetails)
  theaterRouter.route('/update-theater').put(verifyTheaterOwner, updateTheaterInfo)
  theaterRouter.route('/add-screen').post(verifyTheaterOwner, addScreen)
  theaterRouter.route('/get-allScreen').get(verifyTheaterOwner, getAllTheaterScreen)
  theaterRouter.route('/add-shows').post(verifyTheaterOwner, addMovieShow);

  theaterRouter.route('/get-movie/:movieType').get(verifyTheaterOwner, getMovies)
  theaterRouter.route('/get-screen').get(verifyTheaterOwner, getTheaterScreen);
  theaterRouter.route('/get-shows').get(verifyTheaterOwner, getShows)
  theaterRouter.route('/get-theaterMovies').get(verifyTheaterOwner, getRunningMovies)

  return theaterRouter
}


export {
  theaterRoutes
}