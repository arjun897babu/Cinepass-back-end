interface IResponse {
  status: string;
  message: string;
  redirectURL?: string;
  data?: {
    [key: string]: string | number | boolean | object | any[];
  }
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

export {
  IResponse,
  ILogin,
  IUpdateVerification,
  LoginResponse,
  IOTPVerifcation,
  IUpdateApproval

};
