import { IResponse } from ".."


interface IVerifyOTP {
  execute: (email: string, otp: string) => Promise<IResponse>
}

export {
  IVerifyOTP
}