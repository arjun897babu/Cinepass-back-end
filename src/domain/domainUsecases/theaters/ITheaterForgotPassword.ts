import { IResponse } from "..";

interface ITheaterForgotPassword{
  execute:(email:string)=>Promise<IResponse>
}

export{
  ITheaterForgotPassword
}