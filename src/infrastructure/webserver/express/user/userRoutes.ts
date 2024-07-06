import express, { Router } from "express";
import { IDependencies } from "../../../../application/interface/user/IDependencies";
import { userController } from "../../../../presentation/controller/user";

 
const userRoutes = (dependencies: IDependencies) => {
  const router = Router()
  const { signup } = userController(dependencies)
  // router.route('/').get();
  // router.route('/users/login').get();
  // router.route('/users/signup').get(signup);
  // router.route('/users/otp-verification').get();
  // router.route('/users/reset-password').get();

  // router.route('/users/login').post();
  router.route('/signup').post(signup);
  // router.route('/users/otp-verification').post();
  // router.route('/users/reset-password').post();

  return router
}



export { userRoutes }