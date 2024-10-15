import { config } from "../../../config/envConfig";
import { IResponse } from "../../../domain/domainUsecases";
import { CustomError } from "../../../utils/CustomError";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";
import { generateToken } from "../../../utils/jwtHandler";
import {
  resetPasswordTemplate,
  sendMail
} from "../../../infrastructure/nodeMailer";
import {
  ApprovalStatus,
  ResponseStatus,
  Role
} from "../../../utils/enum";

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

        //For pending accounts 
        if (existingTheaterOwner.approval_status === ApprovalStatus.PENDING) {
          throw new CustomError('Waiting For admin approval', 401, 'approval')
        }
        //for rejected accounts
        if (existingTheaterOwner.approval_status === ApprovalStatus.REJECTED) {
          throw new CustomError('Your Account has been rejected', 401, 'approval')
        }
        //For blocked accounts
        if (!existingTheaterOwner.status) {
          throw new CustomError('Your account is blocked', 403, 'blocked')
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