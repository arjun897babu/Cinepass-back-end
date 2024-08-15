import { MovieType, Role } from "../../utils/enum";

interface IResponse {
  status: string;
  message: string;
  redirectURL?: string;
  data?: {
    [key: string]: string | number | boolean | object | any[];
  }
};
interface IResponse2 {
  status: string;
  message: string;
};

interface ILogin {
  email: string,
  password: string
}

interface IUpdateVerification {
  email: string,
  verified: boolean
}
interface IOTPVerifcation {
  email: string,
  otp: string
}
interface LoginResponse extends IResponse {
  accessToken?: string;
  refreshToken?: string
}
interface IUpdateApproval {
  theaterOwnerId: string,
  approval_status: string
}
interface IManageEntity {
  role: Role.users | Role.theaters;
  entityId: string;
}

export {
  IResponse,
  ILogin,
  IUpdateVerification,
  LoginResponse,
  IOTPVerifcation,
  IUpdateApproval,
  IManageEntity,
  IResponse2,


};
