import { LoginResponse } from "../../../domain/domainUsecases/user";
import { OTPEntity } from "../../../domain/entities/common";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";

interface IRepositories {
  signUp: (data: UserEntity) => Promise<UserEntity | null>;
  findByEmail: (data: string) =>Promise<UserEntity | null>;
  login: (email: string) => Promise<UserEntity | null>;
  createOTP: (email: string, OTP: string) => Promise<void>;
  findOtp: (email: string) => Promise<OTPEntity | null>;
  findUserById: (_id: string) => Promise<string | undefined>;
  changeUserStatus: (email: string, verified: boolean) => Promise<boolean>
}

export {
  IRepositories
}