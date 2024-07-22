import { IResponse } from "..";
import { IResetPassword } from "../../../utils/interface";

interface ITheaterResetPassword {
  execute: (paylod: IResetPassword) =>Promise<IResponse>
}

export {
  ITheaterResetPassword
}