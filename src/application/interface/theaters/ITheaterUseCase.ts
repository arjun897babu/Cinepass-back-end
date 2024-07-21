import { ITheaterLoginEntity, ITheaterSignupEntity, ITheaterOTPVerify,ITheaterForgotPassword } from '../../../domain/domainUsecases/theaters'




interface ITheaterUseCase {
  theaterSignupUseCase: (dependencies: any) => ITheaterSignupEntity;
  theaterLoginUseCase: (dependencies: any) => ITheaterLoginEntity;
  verifyTheaterOTPUsecase: (dependencies: any) => ITheaterOTPVerify;
  theaterForgotPasswordUsecase:(dependencies:any) =>ITheaterForgotPassword
}


export {
  ITheaterUseCase
}