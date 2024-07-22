import { IResponse } from "..";

interface IResendOTPTheaterUsecase {
  execute: (email: string) => Promise<IResponse>
}

export {
  IResendOTPTheaterUsecase
}