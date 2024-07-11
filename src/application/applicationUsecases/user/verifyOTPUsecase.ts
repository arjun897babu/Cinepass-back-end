import { CustomError } from "../../../utils/CustomError";
import { IDependencies } from "../../interface/user/IDependencies"

const verifyOTPUseCase = (dependencies: IDependencies) => {
  const { repositories: { findOtp } } = dependencies

  return {
    execute: async (email: string, otp: string) => {
      try {
        const OTPDetails = await findOtp(email);

        if (!OTPDetails) {
          throw new CustomError('OTP expired', 404,'otp');
        }

        if (OTPDetails.otp !== otp) {
          throw new CustomError('Invalid OTP', 404,'otp');
        }
        return

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  verifyOTPUseCase
}