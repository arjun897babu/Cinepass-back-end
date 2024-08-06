import { config } from "../../../config/envConfig"
import { ILogin, LoginResponse } from "../../../domain/domainUsecases"
import { ApprovalStatus, ResponseStatus } from "../../../domain/entities/common"
import { OTPTemplate, sendMail } from "../../../infrastructure/email/nodeMailer"
import { comparePassword } from "../../../utils/bcrypt"
import { CustomError } from "../../../utils/CustomError"
import { Role } from "../../../utils/enum"
import { generateToken } from "../../../utils/jwtHandler"
import { generateOTP } from "../../../utils/OTPGenarator"
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"


const theaterLoginUseCase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerByEmail, createTheatersOTP } } = dependencies
  return {
    execute: async (data: ILogin): Promise<LoginResponse> => {
      try {

        const existingTheaterOwner = await findTheaterOwnerByEmail(data.email);
        //Account not found
        if (!existingTheaterOwner) {
          throw new CustomError('Email not found', 404, 'email');
        }
        //Resending the otp for non verified account
        if (!existingTheaterOwner.verified) {
          const OTP = generateOTP();

          await createTheatersOTP(data.email, OTP)
          sendMail(data.email, 'OTP Verification', OTPTemplate(OTP));

          return {
            status: ResponseStatus.ERROR,
            message: 'Account not verified,please verify your account',
            data: { email: existingTheaterOwner.email },
            redirectURL: '/theaters/otp-verification'
          }
        }
        //For pending accounts 
        if (existingTheaterOwner.approval_status === ApprovalStatus.PENDING) {
          throw new CustomError('Waiting For admin approval', 403, 'approval')
        }
        //for rejected accounts
        if (existingTheaterOwner.approval_status === ApprovalStatus.REJECTED) {
          throw new CustomError('Your request has been rejected', 401, 'approval')
        }
        //For blocked accounts
        if (!existingTheaterOwner.status) {
          throw new CustomError('Your account is blocked', 403, '')
        }
        //Checking password credentials
        const isPassword = await comparePassword(data.password, existingTheaterOwner.password);
        if (!isPassword) {
          throw new CustomError('Invalid password', 401, 'password')
        }

        const theaterId = existingTheaterOwner._id?.toString()
        if (!theaterId) {
          throw new CustomError('Email not found', 404, 'email');
        }

        const accessToken = generateToken({ _id: theaterId, role: Role.theaters }, config.secrets.access_token, '1d')

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Logged Successfully',
          data: { email: data.email },
          accessToken,
          redirectURL: '/theaters/home'
        }


      } catch (error) {
        throw error
      }
    }
  }

}

export {
  theaterLoginUseCase
}