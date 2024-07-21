import { IResponse } from "..";

interface IForgotPassword {
  execute: (email: string) => Promise<IResponse>
}

export {
  IForgotPassword
}