
import {
  IGoogleAuth,
  ILogin,
  ISignUp,
  IVerifyOTP,
  IForgotPassword,
  IResendOTP,
  IResetPasswordUsecase,
  IGetCities
} from "../../../domain/domainUsecases/user"


interface IUseCases {
  signupUseCase: (dependencies: any) => ISignUp;
  loginUseCase: (dependencies: any) => ILogin;
  verifyOTPUseCase: (dependencies: any) => IVerifyOTP
  forgotPasswordUsecase: (dependencies: any) => IForgotPassword;
  resetPasswordUsecase: (dependencies: any) => IResetPasswordUsecase;
  resendOTPUseCase: (dependencies: any) => IResendOTP
  googleAuthUsecase: (dependencies: any) => IGoogleAuth
  getAllCitiesUsecase:(dependencies:any)=>IGetCities
}

export {
  IUseCases
} 