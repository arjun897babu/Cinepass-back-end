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
  IUpdateMovieShow,
  IDeleteMovieShow,
  IDeleteTheaterScreen,
  IUpdateTheaterScreen,

} from '../../../domain/domainUsecases/theaters'
import { ITheaterDependencies } from './ITheaterDependencies';

interface ITheaterUseCase {
  theaterSignupUseCase: (dependencies: ITheaterDependencies) => ITheaterSignupEntity;
  theaterLoginUseCase: (dependencies: ITheaterDependencies) => ITheaterLoginEntity;
  verifyTheaterOTPUsecase: (dependencies: ITheaterDependencies) => ITheaterOTPVerify;
  theaterForgotPasswordUsecase: (dependencies: ITheaterDependencies) => ITheaterForgotPassword;
  theaterResetPasswordUsecase: (dependencies: ITheaterDependencies) => ITheaterResetPassword;
  resendOTPTheaterUsecase: (dependencies: ITheaterDependencies) => IResendOTPTheaterUsecase;
  updateTheaterInfoUsecase: (dependencies: ITheaterDependencies) => IUpdateTheaterInfo;
  createTheaterScreenUsecase: (dependencies: ITheaterDependencies) => ITheaterScreenUsecase;
  getAllTheaterScreenUseCase: (dependencies: ITheaterDependencies) => IGetAllTheaterScreen;
  addMovieShowUsecase: (dependencies: ITheaterDependencies) => IAddMovieShows;
  updateMovieShowUsecase: (dependencies: ITheaterDependencies) => IUpdateMovieShow
  deleteMovieShowUsecase: (dependencies: ITheaterDependencies) => IDeleteMovieShow
  deleteTheaterScreenUsecase: (dependencies: ITheaterDependencies) => IDeleteTheaterScreen
  updateTheaterScreenUsecase: (dependencies: ITheaterDependencies) => IUpdateTheaterScreen

}


export {
  ITheaterUseCase
}