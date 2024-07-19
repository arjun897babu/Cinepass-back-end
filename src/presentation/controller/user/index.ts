import { IDependencies } from "../../../application/interface/user/IDependencies";
import { login } from "./loginController";
import { logout } from "./logoutController";
import { signup } from "./signUpController";
import { verifyOTP } from "./verifyOTPController";


const userController = (dependencies: IDependencies) => {
  return {
    signup: signup(dependencies),
    login: login(dependencies),
    verifyOTP: verifyOTP(dependencies),
    logout:logout()
  }
}


export {
  userController
}