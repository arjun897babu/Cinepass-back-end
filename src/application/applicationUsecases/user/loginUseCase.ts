
import { config } from "../../../config/envConfig";

import { LoginResponse } from "../../../domain/domainUsecases/user";
import { ResponseStatus } from "../../../domain/entities/common";
import { OTPTemplate, sendMail } from "../../../infrastructure/nodeMailer";
import { comparePassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { Role } from "../../../utils/enum";
import { generateToken } from "../../../utils/jwtHandler";
import { generateOTP } from "../../../utils/OTPGenarator";
import { IDependencies } from "../../interface/user/IDependencies"

const loginUseCase = (dependencies: IDependencies) => {
  const { repositories: { login, createOTP } } = dependencies

  return {
    execute: async (email: string, userPassword: string): Promise<LoginResponse> => {
      try {
        const existingUser = await login(email);


        if (!existingUser) {
          throw new CustomError('Email not found', 404, 'email')
        }


        if (!existingUser.verified) {
          const OTP = generateOTP();
          // Save OTP in database
          await createOTP(email, OTP);

          // Send OTP via email
          sendMail(email, 'OTP Verification', OTPTemplate(OTP));

          return {
            status: 'Error',
            message: 'Account not verified,please verify your account',
            redirectURL: '/otp-verification',
            data: { email: email }
          };
        }

        if (!existingUser.status) {
          throw new CustomError('Your account is blocked', 403, 'blocked')
        }
        const { googleId, password, ...rest } = existingUser;

        if (rest.isGoogleAuth) {
          const accessToken = generateToken({ _id: rest._id!.toString(), role: Role.users }, config.secrets.access_token, '1h');
          return {
            status: ResponseStatus.SUCCESS,
            message: 'User Logged successfully',
            accessToken,
            redirectURL: '/',
            data: { user: rest },
          };
        }

        const comparedPassword = await comparePassword(userPassword, password as string);

        if (!comparedPassword) {
          throw new CustomError('Password mismatch', 400, 'password')
        }


        const accessToken = generateToken({ _id: rest._id!.toString(), role: Role.users }, config.secrets.access_token, '1h')
        // const refreshToken = generateToken({_id:userId,role:Role.users}, config.secrets.refresh_token, '7d')


        return {
          status: ResponseStatus.SUCCESS,
          message: 'User Logged successfully',
          accessToken,
          redirectURL: '/',
          data: { user: { ...rest } }
        }


      } catch (error) {
        throw error
      }
    }
  }
}

export {
  loginUseCase
}