import { IDependencies } from "../../../application/interface/user/IDependencies";
import { login } from "./loginController";
import { signup } from "./signUpController";


const userController = (dependencies: IDependencies) => {
  return {
    signup: signup(dependencies),
    login: login(dependencies)
  }
}


export {
  userController
}