import express, { Router, Request, Response, NextFunction } from "express";
import { IDependencies } from "../../../application/interface/user/IDependencies";
import { userController } from "../../../presentation/controller/user";
import { verifyUser } from "../middleware/userMiddleware";


const userRoutes = (dependencies: IDependencies) => {
  const router = Router()
  const { signup, login, verifyOTP, logout } = userController(dependencies)

  router.route('/login').post(login);
  router.route('/signup').post(signup);
  router.route('/otp-verification').post(verifyOTP);

  router.use((req: Request, res: Response, next: NextFunction) => {
    verifyUser(req, res, next);
  });
  router.route('/logout').post(logout);
  // router.route('/users/login').get();
  // router.route('/users/signup').get(signup);
  // router.route('/users/otp-verification').get();
  // router.route('/users/reset-password').get();

  // router.route('/users/reset-password').post();

  return router
}



export { userRoutes }