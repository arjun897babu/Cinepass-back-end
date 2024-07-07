import { UserEntity } from "../../../domain/entities/user/IUserEntity";

interface IRepositories {
  signUp: (data: UserEntity) => Promise<UserEntity | null>;
  findByEmail: (data: string) => Promise<boolean>;
  login: (email: string) => Promise<UserEntity | null>;
  createOTP: (email: string, OTP: string) => Promise<void>;
}

export {
  IRepositories
}