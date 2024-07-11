import { IDependencies } from "../../../application/interface/user/IDependencies";
import { login } from "./loginController";
import { logout } from "./logoutController";
import { signup } from "./signUpController";
import { verifyOTP } from "./verifyOTPController";
import { Request, Response, NextFunction } from "express";


const userController = (dependencies: IDependencies) => {
  return {
    signup: signup(dependencies),
    login: login(dependencies),
    verifyOTP: verifyOTP(dependencies),
    logout: async (req: Request, res: Response, next: NextFunction) => {
      await logout()(req, res, next);
    }
  }
}


export {
  userController
}