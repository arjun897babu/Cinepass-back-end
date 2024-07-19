import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterLogin } from "./theaterLoginController";
import { theaterLogout } from "./theaterLogout";
import { theaterVerify } from "./theaterOTPVerifiyController";
import { theaterSignup } from "./theaterSignupController";


const theaterController = (dependencies: ITheaterDependencies) => {

  return {
    login:theaterLogin(dependencies),
    signup: theaterSignup(dependencies),
    otpVerification: theaterVerify(dependencies),
    logout:theaterLogout()
  }
}

export {
  theaterController
}