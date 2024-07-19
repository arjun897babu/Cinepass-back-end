import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { IDependencies } from "../../interface/user/IDependencies"

const verifyOTPUseCase = (dependencies: IDependencies) => {
  const { repositories: { findOtp, changeUserStatus } } = dependencies

  return {
    execute: async (email: string, otp: string): Promise<IResponse> => {
      try {
        
        const OTPDetails = await findOtp(email);

        if (!OTPDetails) {
          throw new CustomError('OTP expired', 400, 'otp');
        }

        if (OTPDetails.otp !== otp) {
          throw new CustomError('Invalid OTP', 404, 'otp');
        };

        const updated = changeUserStatus(email, false);

        if (!updated) {
          throw new CustomError('User not found', 401, 'otp');
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: 'OTP verified successfully',
          redirectURL: '/login'
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  verifyOTPUseCase
}