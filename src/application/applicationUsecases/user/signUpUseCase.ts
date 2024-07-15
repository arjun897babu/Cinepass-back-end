import { IResponse } from "../../../domain/domainUsecases"
import { ResponseStatus } from "../../../domain/entities/common"
import { UserEntity } from "../../../domain/entities/user/IUserEntity"
import { sendMail } from "../../../infrastructure/email/nodeMailer"
import { hashPassword } from "../../../utils/bcrypt"
import { CustomError } from "../../../utils/CustomError"
import { generateOTP } from "../../../utils/OTPGenarator"
import { IDependencies } from "../../interface/user/IDependencies"

const signupUseCase = (dependencies: IDependencies) => {
  const { repositories: { signUp, findByEmail, createOTP } } = dependencies
  return {
    execute: async (data: UserEntity): Promise<IResponse> => {
      try {
        const existingUser = await findByEmail(data.email);

        if (existingUser) {
          throw new CustomError('User already exists', 409, 'email');
        }
        const hashedPassword = await hashPassword(data.password);
        const OTP = generateOTP();

        await createOTP(data.email, OTP)
        sendMail(data.email, OTP);

        await signUp({ ...data, password: hashedPassword });

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Account registered successfully',
          redirectURL: '/otp-verification',
          data:[{email:data.email}]
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  signupUseCase
}