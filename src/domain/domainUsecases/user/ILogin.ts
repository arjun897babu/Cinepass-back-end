import { LoginResponse} from "..";

interface ILogin {
  execute: (email: string, password: string) => Promise<LoginResponse>;
}

export {
  ILogin,
  LoginResponse,
}