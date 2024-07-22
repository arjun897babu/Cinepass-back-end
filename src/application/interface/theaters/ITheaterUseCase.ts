import { ITheaterLoginEntity, ITheaterSignupEntity, ITheaterOTPVerify, ITheaterForgotPassword, ITheaterResetPassword, IResendOTPTheaterUsecase, } from '../../../domain/domainUsecases/theaters'




interface ITheaterUseCase {
  theaterSignupUseCase: (dependencies: any) => ITheaterSignupEntity;
  theaterLoginUseCase: (dependencies: any) => ITheaterLoginEntity;
  verifyTheaterOTPUsecase: (dependencies: any) => ITheaterOTPVerify;
  theaterForgotPasswordUsecase: (dependencies: any) => ITheaterForgotPassword;
  theaterResetPasswordUsecase: (dependencies: any) => ITheaterResetPassword;
  resendOTPTheaterUsecase:(dependencies:any)=>IResendOTPTheaterUsecase
}


export {
  ITheaterUseCase
}