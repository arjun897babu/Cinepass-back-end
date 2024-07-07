import { UserEntity } from "../../entities/user/IUserEntity";
interface TokenPayLoad {
  accessToken: string;
  refreshToken: string
}

interface ILogin {
  execute: (email: string, password: string) => Promise<TokenPayLoad>;
}

export {
  ILogin
}