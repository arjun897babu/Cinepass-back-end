import { IResponse } from "../../../domain/domainUsecases";
import { ILogin, ISignUp, IVerifyOTP } from "../../../domain/domainUsecases/user"

interface IUseCases {
  signupUseCase: (dependencies: any) => ISignUp;
  loginUseCase: (dependencies: any) => ILogin;
  verifyOTPUseCase: (dependencies: any) => IVerifyOTP
}

export {
  IUseCases
} 