import { IResponse } from "..";
import { IResetPassword } from "../../../utils/interface";

interface IResetPasswordUsecase {
  execute: (payload: IResetPassword) =>Promise<IResponse>
}


export{
  IResetPasswordUsecase
}