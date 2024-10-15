import { IResponse } from "../../../domain/domainUsecases"
import { CustomError } from "../../../utils/CustomError"
import { ResponseStatus } from "../../../utils/enum"
import { generateOTP } from "../../../utils/OTPGenarator"
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"
import {
  OTPTemplate,
  sendMail
} from "../../../infrastructure/nodeMailer"

const resendOTPTheaterUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerByEmail, createTheatersOTP } } = dependencies
  return {
    execute: async (email: string): Promise<IResponse> => {
      try {

        const existingTheaterOwner = await findTheaterOwnerByEmail(email)
        if (!existingTheaterOwner) {
          throw new CustomError('Email not Found', 404, 'email')
        }
        const OTP = generateOTP();

        await createTheatersOTP(email, OTP)
        sendMail(email, 'Reset Password', OTPTemplate(OTP))
        return {
          status: ResponseStatus.SUCCESS,
          message: 'OTP has been sent to your email successfully',
          redirectURL: '#'
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  resendOTPTheaterUsecase
}