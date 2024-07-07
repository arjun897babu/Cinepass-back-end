import { ILogin, ISignUp } from "../../../domain/domainUsecases/user"

interface IUseCases {
  signupUseCase: (dependencies: any) => ISignUp;
  loginUseCase:(dependencies:any)=>ILogin
}

export {
  IUseCases
}