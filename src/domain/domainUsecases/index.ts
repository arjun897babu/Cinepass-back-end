interface IResponse {
  status: string;
  message: string;
  redirectURL?: string;
  data?: any[]
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

export {
  IResponse,
  ILogin,
  IUpdateVerification,
  LoginResponse,
  IOTPVerifcation,
  
};
