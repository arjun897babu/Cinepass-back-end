import express, { Router, Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { userController } from "../../../presentation/controller/user";
import { verifyResetPasswordRequest, verifyUser } from "../middleware/userMiddleware";
import { commonController } from "../../../presentation/controller/common";
import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";


const userRoutes = (dependencies: IDependencies, commonDependencies: ICommonDependencies) => {
  const router = Router()
  const { signup, login, verifyOTP, logout, forgotPassword, resetPassword, resendOTP, googleSignUp, getCities } = userController(dependencies)
  const { getTheater, getShows,getRunningMovies } = commonController(commonDependencies)
  router.route('/login').post(login);
  router.route('/get-cities').get(getCities);
  router.route('/signup').post(signup);
  router.route('/google-signup').post(googleSignUp);
  router.route('/otp-verification').post(verifyOTP);
  router.route('/forgot-password').post(forgotPassword);
  router.route('/reset-password/:token').put(verifyResetPasswordRequest, resetPassword)
  router.route('/resend-otp').post(resendOTP);
  router.route('/logout').post(logout);

  router.route('/theater/:theaterId').get(getTheater)
  router.route('/get-shows/:city').get(getShows)
  router.route('/get-movies/:city').get(getRunningMovies)

  return router
}



export { userRoutes }