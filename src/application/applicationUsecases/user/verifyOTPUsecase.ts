import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../utils/enum";;
import { CustomError } from "../../../utils/CustomError";
import { IDependencies } from "../../interface/user/IDependencies"

const verifyOTPUseCase = (dependencies: IDependencies) => {
  const { repositories: { findOtp, changeUserStatus, findByEmail } } = dependencies

  return {
    execute: async (email: string, otp: string): Promise<IResponse> => {
      try {
        const existingUser = await findByEmail(email);

        if (!existingUser) {
          throw new CustomError('User not found', 404, 'email');
        }
        else if (!existingUser.status) {
          throw new CustomError('Account is blocked', 403, 'blocked')
        }

        const OTPDetails = await findOtp(email);

        if (!OTPDetails) {
          throw new CustomError('OTP expired', 400, 'expired');
        }

        if (OTPDetails.otp !== otp) {
          throw new CustomError('Invalid OTP', 400, 'otp');
        };

        await changeUserStatus(email, false);


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