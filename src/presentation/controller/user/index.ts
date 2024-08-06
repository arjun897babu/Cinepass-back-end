import { IDependencies } from "../../../application/interface/user/IDependencies";
import { forgotPassword } from "./forgotPasswordController";
import { getAllCities } from "./getAllCities";
import { googleSignUp } from "./GoogleSignUpController";
import { login } from "./loginController";
import { logout } from "./logoutController";
import { resendOTP } from "./resendOTPController";
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
    resetPassword: resetPassword(dependencies),
    resendOTP: resendOTP(dependencies),
    googleSignUp: googleSignUp(dependencies),
    getCities: getAllCities(dependencies),
  }
}


export {
  userController
}