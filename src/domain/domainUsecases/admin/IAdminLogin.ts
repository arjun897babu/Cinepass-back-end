import { ILogin , LoginResponse } from "..";

interface IAdminLogin {
  execute: (data: ILogin) => Promise<LoginResponse >
}

export {
  IAdminLogin
}