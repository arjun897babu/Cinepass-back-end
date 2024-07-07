import { UserEntity } from "../../../domain/entities/user/IUserEntity"
import { sendMail } from "../../../infrastructure/email/nodeMailer"
import { hashPassword } from "../../../utils/bcrypt"
import { CustomError } from "../../../utils/CustomError"
import { generateOTP } from "../../../utils/OTPGenarator"
import { IDependencies } from "../../interface/user/IDependencies"

const signupUseCase = (dependencies: IDependencies) => {
  const { repositories: { signUp, findByEmail, createOTP } } = dependencies
  return {
    execute: async (data: UserEntity) => {
      try {
        const existingUser = await findByEmail(data.email);

        if (existingUser) {
          throw new CustomError('User already exists', 409);
        }
        const hashedPassword = await hashPassword(data.password);
        const OTP = generateOTP();
        console.log('generated otp : ', OTP)
        await createOTP(data.email, OTP)
        sendMail(data.email, OTP);
        return await signUp({ ...data, password: hashedPassword });

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  signupUseCase
}