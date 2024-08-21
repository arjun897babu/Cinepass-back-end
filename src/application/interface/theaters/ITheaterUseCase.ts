import {
  ITheaterLoginEntity,
  ITheaterSignupEntity,
  ITheaterOTPVerify,
  ITheaterForgotPassword,
  ITheaterResetPassword,
  IResendOTPTheaterUsecase,
  IUpdateTheaterInfo,
  ITheaterScreenUsecase,
  IGetAllTheaterScreen,
  IAddMovieShows,

} from '../../../domain/domainUsecases/theaters'

interface ITheaterUseCase {
  theaterSignupUseCase: (dependencies: any) => ITheaterSignupEntity;
  theaterLoginUseCase: (dependencies: any) => ITheaterLoginEntity;
  verifyTheaterOTPUsecase: (dependencies: any) => ITheaterOTPVerify;
  theaterForgotPasswordUsecase: (dependencies: any) => ITheaterForgotPassword;
  theaterResetPasswordUsecase: (dependencies: any) => ITheaterResetPassword;
  resendOTPTheaterUsecase: (dependencies: any) => IResendOTPTheaterUsecase;
  updateTheaterInfoUsecase: (dependencies: any) => IUpdateTheaterInfo;
  createTheaterScreenUsecase: (dependencies: any) => ITheaterScreenUsecase;
  getAllTheaterScreenUseCase: (dependencies: any) => IGetAllTheaterScreen;
  addMovieShowUsecase: (dependencies: any) => IAddMovieShows;
}


export {
  ITheaterUseCase
}