import { IResponse } from ".."

interface IResendOTP {
  execute: (email: string) => Promise<IResponse>
}

export {
  IResendOTP
}