import express, { Router, Request, Response, NextFunction } from "express";
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
    getCities
  } = userController(dependencies)

  const {
    getTheater,
    getShows,
    getRunningMovies
  } = commonController(commonDependencies)

  /*......................................... AUTH........................................... */

  router.route('/login').post(login);
  router.route('/signup').post(signup);
  router.route('/google-signup').post(googleSignUp);
  router.route('/otp-verification').post(verifyOTP);
  router.route('/forgot-password').post(forgotPassword);
  router.route('/reset-password/:token').patch(verifyResetPasswordRequest, resetPassword)
  router.route('/resend-otp').post(resendOTP);
  router.route('/logout').post(logout);
  /*......................................... AUTH........................................... */

  router.route('/theater/:theaterId').get(getTheater)
  router.route('/cities').get(getCities);
  router.route('/shows/:city').get(getShows)
  router.route('/movies/:city').get(isUserBlocked, getRunningMovies)

  return router 
}

 

export { userRoutes } 