import express, { Router } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { userController } from "../../../presentation/controller/user";
import { isUserBlocked, verifyResetPasswordRequest, verifyUser } from "../middleware/userMiddleware";
import { commonController } from "../../../presentation/controller/common";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";


const userRoutes = (dependencies: IDependencies, commonDependencies: ICommonDependencies) => {
  const router = Router()
  const {
    signup,
    login,
    verifyOTP,
    logout,
    forgotPassword,
    resetPassword,
    resendOTP,
    googleSignUp,
    getCities,
    getUserProfile,
    updateUserProfile,
    cancelUserPayments,
    cancelUserTicket,
    purchaseStreaming,
    getStreamingMovies
  } = userController(dependencies)

  const {
    getTheater,
    getShows,
    getRunningMovies,
    getMovies,
    ticketReservation,
    getTickets
  } = commonController(commonDependencies)

  /*......................................... AUTH........................................... */

  router.route('/login').post(login);
  router.route('/signup').post(signup);
  router.route('/google-signup').post(googleSignUp);
  router.route('/otp-verification').post(verifyOTP);
  router.route('/forgot-password').post(forgotPassword);
  router.route('/reset-password/:token?').patch(verifyResetPasswordRequest, verifyUser, resetPassword)
  router.route('/resend-otp').post(resendOTP);
  router.route('/logout').post(logout);
  /*......................................... AUTH........................................... */


  router
    .route('/profile')
    .get(verifyUser, getUserProfile)
    .put(verifyUser, updateUserProfile)

  router.route('/theater/:city').get(getTheater)
  router.route('/cities').get(getCities);
  router.route('/shows/:city').get(getShows)
  router.route('/movies/:city').get(getRunningMovies)

  router
    .route('/booking/:showId')
    .post(verifyUser, ticketReservation)

  router
    .route('/tickets')
    .get(verifyUser, getTickets)
    .post(verifyUser, cancelUserTicket)//to cancel ticket
  router
    .route('/payment/:paymentIntent')
    .post(verifyUser, cancelUserPayments) //to cancel payments
  router
    .route('/stream')
    .get(verifyUser,getStreamingMovies)//all available movie lists
  router
    .route('/stream/:movieId')
    .get(verifyUser,getStreamingMovies)//single streaming movie details
    .post(verifyUser,purchaseStreaming)

  return router
}



export { userRoutes } 