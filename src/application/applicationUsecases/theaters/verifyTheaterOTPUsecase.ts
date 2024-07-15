import { ObjectId } from "mongoose"
import { IResponse, IOTPVerifcation } from "../../../domain/domainUsecases"
import { ResponseStatus } from "../../../domain/entities/common"
import { ITheaterOwnerEntity, ITheaters } from "../../../domain/entities/theaters"
import { CustomError } from "../../../utils/CustomError"
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"

const verifyTheaterOTPUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerOTP, verifyTheaterOwner, createTheater } } = dependencies
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

        const updated: ITheaterOwnerEntity | null = await verifyTheaterOwner({ email: data.email, verified: false });
       
        if (updated) {
  
          await createTheater(
            {
              ownerId: updated._id as ObjectId,
              theater_Name: updated.theater_name,
              theater_license: updated.theater_license,
            }
          )
  
  
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