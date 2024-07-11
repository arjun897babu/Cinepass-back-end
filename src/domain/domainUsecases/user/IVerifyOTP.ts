

interface IVerifyOTP {
  execute: (email: string, otp: string) => Promise<void>
}

export {
  IVerifyOTP
}