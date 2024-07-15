import { ITheaterLoginEntity, ITheaterSignupEntity, ITheaterOTPVerify } from '../../../domain/domainUsecases/theaters'



interface ITheaterUseCase {
  theaterSignupUseCase: (dependencies: any) => ITheaterSignupEntity;
  theaterLoginUseCase: (dependencies: any) => ITheaterLoginEntity;
  verifyTheaterOTPUsecase: (dependencies: any) => ITheaterOTPVerify;
}


export {
  ITheaterUseCase
}