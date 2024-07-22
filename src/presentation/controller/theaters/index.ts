import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterForgotPassword } from "./forgotPasswordController";
import { theaterLogin } from "./theaterLoginController";
import { theaterLogout } from "./theaterLogout";
import { theaterVerify } from "./theaterOTPVerifiyController";
import { resetPasswordTheaters } from "./theaterResetPassword";
import { theaterSignup } from "./theaterSignupController";


const theaterController = (dependencies: ITheaterDependencies) => {

  return {
    login: theaterLogin(dependencies),
    signup: theaterSignup(dependencies),
    otpVerification: theaterVerify(dependencies),
    logout: theaterLogout(),
    forgotPassword: theaterForgotPassword(dependencies),
    resetPassword: resetPasswordTheaters(dependencies)
  }
}

export {
  theaterController
}