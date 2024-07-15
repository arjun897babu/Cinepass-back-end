
import { config } from "../../../config/envConfig";
 
import { LoginResponse } from "../../../domain/domainUsecases/user";
import { Status } from "../../../domain/entities/common";
import { sendMail } from "../../../infrastructure/email/nodeMailer";
import { comparePassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { generateToken } from "../../../utils/jwtHandler";
import { generateOTP } from "../../../utils/OTPGenarator";
import { IDependencies } from "../../interface/user/IDependencies"

const loginUseCase = (dependencies: IDependencies) => { 
  const { repositories: { login, createOTP } } = dependencies

  return {
    execute: async (email: string, userPassword: string):Promise<LoginResponse> => {
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
          sendMail(email, OTP);

          return {
            status: 'Error',
            message: 'Account not verified,please verify your account',
            redirectURL: '/otp-verification',
            data:[{email:email}]
          };
        }

        if (existingUser.status === Status.BLOCKED) {
          throw new CustomError('Your account is blocked', 403, 'blocked')
        }

        const comparedPassword = await comparePassword(userPassword, existingUser.password);

        if (!comparedPassword) {
          throw new CustomError('Password mismatch', 401, 'password')
        }

        const userId = existingUser._id?.toString();
        if (!userId) {
          throw new CustomError('Email not found', 404, 'email');
        }

        const accessToken = generateToken(userId, config.secrets.access_token, '1h')
        const refreshToken = generateToken(userId, config.secrets.refresh_token, '7d')
        const { _id, password, ...rest } = existingUser
        console.log('destructured user',rest)
        return {
          status: 'Success',
          message: 'User Logged successfully',
          accessToken,
          refreshToken,
          data: [{ ...rest }]
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