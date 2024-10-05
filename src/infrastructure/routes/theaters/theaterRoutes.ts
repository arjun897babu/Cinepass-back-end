import { Router } from "express";
import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterController } from "../../../presentation/controller/theaters";
import { verifyTheaterOwner, verifyTheaterResetPasswordRequest } from "../middleware/theaterMiddleware";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { commonController } from "../../../presentation/controller/common";
import { updateShow } from "../../../presentation/controller/theaters/updateShowController";

const theaterRoutes = (dependencies: ITheaterDependencies, commonDependencies: ICommonDependencies) => {
  const theaterRouter = Router();

  const {
    signup,
    otpVerification,
    login,
    logout,
    forgotPassword,
    resetPassword,
    resendOTPTheaters,
    updateTheaterInfo,
    addScreen,
    getAllTheaterScreen,
    addMovieShow,
    updateMovieShow,
    deleteMovieShow,
    deleteScreen,
    updateTheaterScreen
  } = theaterController(dependencies);

  const { getMovies, getShows, getRunningMovies, getTheater, getTickets } = commonController(commonDependencies);

  /*......................................... AUTH........................................... */

  theaterRouter.route('/login').post(login);//login
  theaterRouter.route('/signup').post(signup);//signup
  theaterRouter.route('/forgot-password').post(forgotPassword)//forgot password email verification
  theaterRouter.route('/otp-verification').post(otpVerification)//otp verification for email (register and reset password)
  theaterRouter.route('/reset-password/:token').put(verifyTheaterResetPasswordRequest, resetPassword)//resetting password
  theaterRouter.route('/logout').post(verifyTheaterOwner, logout)//logout
  theaterRouter.route('/resend-otp').post(resendOTPTheaters)//resend otp

  /*......................................... AUTH........................................... */


  theaterRouter
    .route('/theater')
    .get(verifyTheaterOwner, getTheater)//for getting theater Details
    .put(verifyTheaterOwner, updateTheaterInfo)//for updating the theater details
  theaterRouter.route('/screen')
    .post(verifyTheaterOwner, addScreen)//adding screen to the theater
    .get(verifyTheaterOwner, getAllTheaterScreen)//get all screen in a single theater
  theaterRouter.route('/screen/:screenId')
    .put(verifyTheaterOwner, updateTheaterScreen) //for updating a theater screen
    .patch(verifyTheaterOwner, deleteScreen)//for un-listing a screen

  theaterRouter
    .route('/movie/:movieType')
    .get(verifyTheaterOwner, getMovies)//for get all the movies available for shows

  theaterRouter
    .route('/shows')
    .get(verifyTheaterOwner, getShows)
    .post(verifyTheaterOwner, addMovieShow)//adding shows to theater screen

  theaterRouter
    .route('/shows/:showId')
    .put(verifyTheaterOwner, updateMovieShow)//adding shows to theater screen
    .patch(verifyTheaterOwner, deleteMovieShow);//delete a movie shows  

  theaterRouter
    .route('/movies')
    .get(verifyTheaterOwner, getRunningMovies)

  theaterRouter
    .route('/tickets')
    .get(verifyTheaterOwner, getTickets)

  return theaterRouter
}


export {
  theaterRoutes
}