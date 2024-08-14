import { Router } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterController } from "../../../presentation/controller/theaters";
import { verifyTheaterOwner, verifyTheaterResetPasswordRequest } from "../middleware/theaterMiddleware";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { commonController } from "../../../presentation/controller/common";

const theaterRoutes = (dependencies: ITheaterDependencies, commonDependencies: ICommonDependencies) => {
  const theaterRouter = Router();

  const { signup, otpVerification, login, logout, forgotPassword, resetPassword, resendOTPTheaters, getTheaterDetails, updateTheaterInfo, addScreen, getAllTheaterScreen, addMovieShow } = theaterController(dependencies);

  const {getMovies, getShows, getRunningMovies } = commonController(commonDependencies);
            
  /*......................................... AUTH........................................... */
  
  theaterRouter.route('/login').post(login);//login
  theaterRouter.route('/signup').post(signup);//signup
  theaterRouter.route('/forgot-password').post(forgotPassword)//forgot password email verification
  theaterRouter.route('/otp-verification').post(otpVerification)//otp verification for email (register and reset password)
  theaterRouter.route('/reset-password/:token').put(verifyTheaterResetPasswordRequest, resetPassword)//resetting password
  theaterRouter.route('/logout').post(verifyTheaterOwner, logout)//logout
  theaterRouter.route('/resend-otp').post(resendOTPTheaters)//resend otp
  
  /*......................................... AUTH........................................... */
  
  
  theaterRouter.route('/theater').get(verifyTheaterOwner, getTheaterDetails)//for getting theater Details
  theaterRouter.route('/update-theater').put(verifyTheaterOwner, updateTheaterInfo)//for updating the theater deatails
  theaterRouter.route('/add-screen').post(verifyTheaterOwner, addScreen)//adding screen to the theater
  theaterRouter.route('/get-allScreen').get(verifyTheaterOwner, getAllTheaterScreen)//get all screen in a single theater
  theaterRouter.route('/add-shows').post(verifyTheaterOwner, addMovieShow);//adding shows to theater screen

  theaterRouter.route('/get-movie/:movieType').get(verifyTheaterOwner, getMovies)//for get all the movies available for shows
  
  theaterRouter.route('/get-shows').get(verifyTheaterOwner, getShows)
  theaterRouter.route('/get-theaterMovies').get(verifyTheaterOwner, getRunningMovies)

  return theaterRouter
}


export {
  theaterRoutes
}