 
import { IResponse, IOTPVerifcation } from "../../../domain/domainUsecases"
import { ResponseStatus } from "../../../domain/entities/common"
 
import { CustomError } from "../../../utils/CustomError"
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"

const verifyTheaterOTPUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerOTP, verifyTheaterOwner } } = dependencies
  return {
    execute: async (data: IOTPVerifcation): Promise<IResponse> => {
      try {
        const OTPDetails = await findTheaterOwnerOTP(data.email);
        if (!OTPDetails) {
          throw new CustomError('OTP expired', 400, 'otp');
        }

        if (data.otp !== OTPDetails.otp) {
          throw new CustomError('Invalid otp', 400, 'otp')
        }

        const isVerified  = await verifyTheaterOwner({ email: data.email, verified: false });
       
        if (isVerified) {
          return {
            status: ResponseStatus.SUCCESS,
            message: 'OTP verified successfully',
            redirectURL:'/theaters/login'
          }
        }
        
        throw new CustomError('User not found', 401, '')

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  verifyTheaterOTPUsecase
}