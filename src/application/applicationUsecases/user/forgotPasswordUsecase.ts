import { config } from "../../../config/envConfig";
import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { resetPasswordTemplate, sendMail } from "../../../infrastructure/email/nodeMailer";
import { CustomError } from "../../../utils/CustomError";
import { Role } from "../../../utils/enum";
import { generateToken } from "../../../utils/jwtHandler";
import { IDependencies } from "../../interface/user/IDependencies";

const forgotPasswordUsecase = (dependencies: IDependencies) => {
  const { repositories: { findByEmail } } = dependencies;
  return {
    execute: async (email: string): Promise<IResponse> => {

      const existingUser = await findByEmail(email);
      if (!existingUser) {
        throw new CustomError('Email not exist', 404, 'email')
      }
      const _id = existingUser._id?.toString()

      if (!_id) {
        throw new CustomError('Email not exist', 404, 'email')
      }

      const token = generateToken(_id, config.secrets.short_lived_access_token, '5m');
      const link = `${config.http.origin}/${Role.users}/reset-password/${token}`
      sendMail(email, 'Reset Password', resetPasswordTemplate(link))

      return {
        status: ResponseStatus.SUCCESS,
        message: 'Password Reset Link has been sent to Your Email',
        redirectURL: '#',
        data: { email }
      }

    }
  }
}

export {
  forgotPasswordUsecase
}