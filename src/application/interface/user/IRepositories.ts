import { OTPEntity } from "../../../domain/entities/common";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";
import { IResetPassword } from "../../../utils/interface";

interface IRepositories {
  signUp: (data: UserEntity) => Promise<UserEntity | null>;
  findByEmail: (data: string) => Promise<UserEntity | null>;
  login: (email: string) => Promise<UserEntity | null>;
  createOTP: (email: string, OTP: string) => Promise<void>;
  findOtp: (email: string) => Promise<OTPEntity | null>;
  findUserById: (_id: string) => Promise<UserEntity | null>;
  changeUserStatus: (email: string, verified: boolean) => Promise<boolean>;
  resetPassword: (JwtPayload: IResetPassword) => Promise<boolean>;
  getCities: () => Promise<string[] | []>
  getUserProfile: (_id: string) => Promise<UserEntity>
  updateUserProfile: (_id: string, payload: Partial<UserEntity>) => Promise<Partial<UserEntity>>

}

export {
  IRepositories
}