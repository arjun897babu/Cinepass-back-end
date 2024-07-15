import { ITheaterDependencies } from "../../../application/interface/theaters/ITheaterDependencies";
import { theaterLogin } from "./theaterLoginController";
import { theaterVerify } from "./theaterOTPVerifiyController";
import { theaterSignup } from "./theaterSignupController";


const theaterController = (dependencies: ITheaterDependencies) => {

  return {
    login:theaterLogin(dependencies),
    signup: theaterSignup(dependencies),
    otpVerification: theaterVerify(dependencies)
  }
}

export {
  theaterController
}