 
import { ILogin, ISignUp, IVerifyOTP } from "../../../domain/domainUsecases/user"
import { IForgotPassword } from "../../../domain/domainUsecases/user/IForgotPassword";
import { IResetPasswordUsecase } from "../../../domain/domainUsecases/user/IResetPassword";

interface IUseCases {
  signupUseCase: (dependencies: any) => ISignUp;
  loginUseCase: (dependencies: any) => ILogin;
  verifyOTPUseCase: (dependencies: any) => IVerifyOTP
  forgotPasswordUsecase:(dependencies:any)=>IForgotPassword;
  resetPasswordUsecase:(dependencies:any)=>IResetPasswordUsecase
}

export {
  IUseCases
} 