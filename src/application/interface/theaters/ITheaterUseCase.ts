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
  IGetCountStat,

} from '../../../domain/domainUsecases/theaters'
import { IGetRevenueByScreen } from '../../../domain/domainUsecases/theaters/IGetRevenueByScreen';
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
  getCountStat: (dependencies: ITheaterDependencies) => IGetCountStat
  getRevenueByScreen: (dependencies: ITheaterDependencies) => IGetRevenueByScreen

}


export {
  ITheaterUseCase
}