import { ResponseStatus } from "../../../utils/enum"
import { CustomError } from "../../../utils/CustomError"
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"
import {
  IResponse,
  IOTPVerifcation
} from "../../../domain/domainUsecases"

const verifyTheaterOTPUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerOTP, verifyTheaterOwner, findTheaterOwnerByEmail } } = dependencies
  return {
    execute: async (data: IOTPVerifcation): Promise<IResponse> => {
      try {

        const existingTheaterOwner = await findTheaterOwnerByEmail(data.email)

        if (!existingTheaterOwner) {
          throw new CustomError('Account no found', 404, 'email');
        }
        else if (!existingTheaterOwner.status) {
          throw new CustomError('Account is blocked', 403, 'blocked');
        }

        const OTPDetails = await findTheaterOwnerOTP(data.email);
        if (!OTPDetails) {
          throw new CustomError('OTP expired', 400, 'otp');
        }

        else if (data.otp !== OTPDetails.otp) {
          throw new CustomError('Invalid otp', 400, 'otp')
        }

        const isVerified = await verifyTheaterOwner({ email: data.email, verified: false });

        if (isVerified) {
          return {
            status: ResponseStatus.SUCCESS,
            message: 'OTP verified successfully',
            redirectURL: '/theaters/login'
          }
        }

        throw new CustomError('User not found', 404, 'email')

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  verifyTheaterOTPUsecase
}