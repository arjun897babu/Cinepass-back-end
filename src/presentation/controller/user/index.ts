import { IDependencies } from "../../../application/interface/user/IDependencies";
import { forgotPassword } from "./forgotPasswordController";
import { login } from "./loginController";
import { logout } from "./logoutController";
import { resetPassword } from "./resetPasswordController";
import { signup } from "./signUpController";
import { verifyOTP } from "./verifyOTPController";


const userController = (dependencies: IDependencies) => {
  return {
    signup: signup(dependencies),
    login: login(dependencies),
    verifyOTP: verifyOTP(dependencies),
    logout: logout(),
    forgotPassword: forgotPassword(dependencies),
    resetPassword: resetPassword(dependencies)
  }
}


export {
  userController
}