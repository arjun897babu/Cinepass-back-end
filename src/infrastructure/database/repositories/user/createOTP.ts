import { OTPEntity } from "../../../../domain/entities/common";
import { OTP } from "../../model/OTPSchema";



const createOTP = async (email: string, otp: string): Promise<void> => {
  try {
    const savedOtp =await OTP.create({ email, otp });
    console.log('created otp document in database: ',savedOtp)

    return
  } catch (error) {
    throw error
  }
}
 
export {
  createOTP
}