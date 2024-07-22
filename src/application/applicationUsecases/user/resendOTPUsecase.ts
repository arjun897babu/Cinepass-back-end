import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { OTPTemplate, sendMail } from "../../../infrastructure/email/nodeMailer";
import { CustomError } from "../../../utils/CustomError";
import { generateOTP } from "../../../utils/OTPGenarator";
import { IDependencies } from "../../interface/user/IDependencies"



const resendOTPUseCase = (dependencies: IDependencies) => {
  const { repositories: { findByEmail, createOTP } } = dependencies;
  return {
    execute: async (email: string): Promise<IResponse> => {
      try {

        const existingUser = await findByEmail(email)
        if (!existingUser) {
          throw new CustomError('Email not Found', 404, 'email')
        }
        const OTP = generateOTP();

        await createOTP(email, OTP)
        sendMail(email, 'Reset Password', OTPTemplate(OTP))
        return {
          status: ResponseStatus.SUCCESS,
          message: 'OTP has been sent to your email successfully'
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  resendOTPUseCase
}