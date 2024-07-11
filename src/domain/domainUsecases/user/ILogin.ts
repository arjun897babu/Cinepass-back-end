import { IResponse } from "..";

  
interface LoginResponse extends IResponse {
  accessToken?: string;
  refreshToken?: string
}

interface ILogin {
  execute: (email: string, password: string) => Promise<LoginResponse>;
}

export {
  ILogin,
  LoginResponse,
}