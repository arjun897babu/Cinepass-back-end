import express, { Router, Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { userController } from "../../../presentation/controller/user";
import { verifyResetPasswordRequest, verifyUser } from "../middleware/userMiddleware";


const userRoutes = (dependencies: IDependencies) => {
  const router = Router()
  const { signup, login, verifyOTP, logout, forgotPassword, resetPassword, resendOTP,googleSignUp } = userController(dependencies)

  router.route('/login').post(login);
  router.route('/signup').post(signup);
  router.route('/google-signup').post(googleSignUp);
  router.route('/otp-verification').post(verifyOTP);
  router.route('/forgot-password').post(forgotPassword);
  router.route('/reset-password/:token').put(verifyResetPasswordRequest, resetPassword)
  router.route('/resend-otp').post(resendOTP);
  router.route('/logout').post( logout);


  return router
}



export { userRoutes }