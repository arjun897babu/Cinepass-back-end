import { IDependencies } from "../../../application/interface/user/IDependencies";
import { signup } from "./signUpController";


const userController = (dependencies: IDependencies) => {
  return {
    signup: signup(dependencies)
  }
}


export {
  userController
}