import { config } from "../../../config/envConfig";
import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { resetPasswordTemplate, sendMail } from "../../../infrastructure/email/nodeMailer";
import { CustomError } from "../../../utils/CustomError";
import { Role } from "../../../utils/enum";
import { generateToken } from "../../../utils/jwtHandler";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const theaterForgotPasswordUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerByEmail } } = dependencies
  return {
    execute: async (email: string): Promise<IResponse> => {
      try {

        const existingTheaterOwner = await findTheaterOwnerByEmail(email);
        if (!existingTheaterOwner) {
          throw new CustomError('Email not exists', 404, 'email')
        }
        const _id = existingTheaterOwner._id?.toString();
        if (!_id) {
          throw new CustomError('Email not exists', 404, 'email')
        }

        const token = generateToken({ _id, role: Role.theaters }, config.secrets.short_lived_access_token, '5m')
        const link = `${config.http.origin}/${Role.theaters}/reset-password/${token}`;
        sendMail(email, 'Reset Password', resetPasswordTemplate(link))
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Password Reset Link has been sent to Your Email',
          redirectURL: '#',
          data: { email }
        }
      } catch (error) {
        throw error
      }
    }
  }
}
export {
  theaterForgotPasswordUsecase
}