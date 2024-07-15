import { config } from "../../../config/envConfig"
import { ILogin, LoginResponse } from "../../../domain/domainUsecases"
import { ResponseStatus, Status } from "../../../domain/entities/common"
import { sendMail } from "../../../infrastructure/email/nodeMailer"
import { comparePassword } from "../../../utils/bcrypt"
import { CustomError } from "../../../utils/CustomError"
import { generateToken } from "../../../utils/jwtHandler"
import { generateOTP } from "../../../utils/OTPGenarator"
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"


const theaterLoginUseCase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerByEmail, createTheatersOTP } } = dependencies
  return {
    execute: async (data: ILogin): Promise<LoginResponse> => {
      try {

        const existingTheaterOwner = await findTheaterOwnerByEmail(data.email)
        if (!existingTheaterOwner) {
          console.log(existingTheaterOwner)
          throw new CustomError('Email not found', 404, 'email');
        }

        if (!existingTheaterOwner.verified) {
          const OTP = generateOTP();

          await createTheatersOTP(data.email, OTP)
          sendMail(data.email, OTP);

          return {
            status: ResponseStatus.ERROR,
            message: 'Account not verified,please verify your account',
            data: [{ email: existingTheaterOwner.email }],
            redirectURL: '/theaters/otp-verification'
          }
        }

        if (existingTheaterOwner.status === Status.BLOCKED) {
          throw new CustomError('Your account is blocked', 403, '')
        }

        const isPassword = comparePassword(data.password, existingTheaterOwner.password);
        if (!isPassword) {
          throw new CustomError('Invalid password', 401, 'password')
        }

        const userId = existingTheaterOwner._id?.toString()
        if (!userId) {
          throw new CustomError('Email not found', 404, 'email');
        }

        const accessToken = generateToken(userId, config.secrets.access_token, '1d')

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Logged Successfully',
          data: [{ email: data.email }],
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