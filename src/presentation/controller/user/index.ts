import { IDependencies } from "../../../application/interface/user/IDependencies";
import { cancelUserPayments } from "./cancel-user-payments";
import { cancelUserTicket } from "./cancel-user-ticket";
import { forgotPassword } from "./forgotPasswordController";
import { getAllCities } from "./getAllCities";
import { getUserData } from "./getUserDataController";
import { googleSignUp } from "./GoogleSignUpController";
import { login } from "./loginController";
import { logout } from "./logoutController";
import { resendOTP } from "./resendOTPController";
import { resetPassword } from "./resetPasswordController";
import { signup } from "./signUpController";
import { getHlsUrl, getStreamMovies, purchaseStreaming } from "./stream-movie";
import { updateProfile } from "./updateProfileController";
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
    getUserProfile: getUserData(dependencies),
    updateUserProfile: updateProfile(dependencies),
    cancelUserPayments: cancelUserPayments(dependencies),
    cancelUserTicket: cancelUserTicket(dependencies),
    getStreamingMovies: getStreamMovies(dependencies),
    purchaseStreaming: purchaseStreaming(dependencies),
    getHlsUrl: getHlsUrl(dependencies),


  }
}


export {
  userController
}