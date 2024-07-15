import { OTPEntity } from "../../../../domain/entities/common";
import { OTP } from "../../model/OTPSchema";

const findTheaterOwnerOTP = async (email: string): Promise<OTPEntity | null> => {
  try {
    const existingOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }).limit(1).lean()
    return existingOTP
  } catch (error) {
    throw error
  }
}

export {
  findTheaterOwnerOTP
}