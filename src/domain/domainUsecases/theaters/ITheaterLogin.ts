import { ILogin, IResponse, LoginResponse } from "..";

interface ITheaterLoginEntity {
  execute: (data: ILogin) => Promise<LoginResponse>
}

export {
  ITheaterLoginEntity
}