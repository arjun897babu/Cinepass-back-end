
import {
  IGoogleAuth,
  ILogin,
  ISignUp,
  IVerifyOTP,
  IForgotPassword,
  IResendOTP,
  IResetPasswordUsecase,
  IGetCities,
  IGetUserProfile,
  IUpdateUserProfile,
  ICancelPayment
} from "../../../domain/domainUsecases/user"
import { IDependencies } from "./IDependencies";


interface IUseCases {
  signupUseCase: (dependencies: IDependencies) => ISignUp;
  loginUseCase: (dependencies: IDependencies) => ILogin;
  verifyOTPUseCase: (dependencies: IDependencies) => IVerifyOTP
  forgotPasswordUsecase: (dependencies: IDependencies) => IForgotPassword;
  resetPasswordUsecase: (dependencies: IDependencies) => IResetPasswordUsecase;
  resendOTPUseCase: (dependencies: IDependencies) => IResendOTP
  googleAuthUsecase: (dependencies: IDependencies) => IGoogleAuth
  getAllCitiesUsecase: (dependencies: IDependencies) => IGetCities
  getUserProfileUsecase: (dependencies: IDependencies) => IGetUserProfile
  updateUserProfileUsecase: (dependencies: IDependencies) => IUpdateUserProfile
  cancelPayments: (dependencies: IDependencies) => ICancelPayment
  cancelTickets: (dependencies: IDependencies) => ICancelPayment
}

export {
  IUseCases
} 