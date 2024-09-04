import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { addMovieShow } from "./addMovieShow";
import { addTheaterScreen } from "./addTheaterScreenController";
import { deleteMovieShow } from "./deleteMovieShow";
import { deleteScreen } from "./deleteScreenController";
import { theaterForgotPassword } from "./forgotPasswordController";

import { getAllTheaterScreen } from "./getTheaterScreenController";
import { resendOTPTheaters } from "./resendOTPController";
import { theaterLogin } from "./theaterLoginController";
import { theaterLogout } from "./theaterLogout";
import { theaterVerify } from "./theaterOTPVerifiyController";
import { resetPasswordTheaters } from "./theaterResetPassword";
import { theaterSignup } from "./theaterSignupController";
import { updateShow } from "./updateShowController";
import { updateTheaterInfo } from "./updateTheaterController";
import { updateTheaterScreen } from "./updateTheaterScreenController";


const theaterController = (dependencies: ITheaterDependencies) => {

  return {
    login: theaterLogin(dependencies),
    signup: theaterSignup(dependencies),
    otpVerification: theaterVerify(dependencies),
    logout: theaterLogout(),
    forgotPassword: theaterForgotPassword(dependencies),
    resetPassword: resetPasswordTheaters(dependencies),
    resendOTPTheaters: resendOTPTheaters(dependencies),

    updateTheaterInfo: updateTheaterInfo(dependencies),
    addScreen: addTheaterScreen(dependencies),
    getAllTheaterScreen: getAllTheaterScreen(dependencies),
    addMovieShow: addMovieShow(dependencies),
    updateMovieShow: updateShow(dependencies),
    deleteMovieShow: deleteMovieShow(dependencies),
    deleteScreen: deleteScreen(dependencies),
    updateTheaterScreen: updateTheaterScreen(dependencies)

  }
}

export {
  theaterController
}