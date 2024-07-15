import { OTP } from "../../model/OTPSchema"

const createTheatersOTP = async (email: string, otp: string): Promise<void> => {
  try {
    await OTP.create({ email: email, otp: otp });
    return
  } catch (error) {
    throw error
  }
}

export {
  createTheatersOTP
}