
import { IResponse } from "../../../domain/domainUsecases";
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters/ITheaterOwners";
import { hashPassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { generateOTP } from "../../../utils/OTPGenarator";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";
import {
  OTPTemplate,
  sendMail
} from "../../../infrastructure/nodeMailer";

const theaterSignupUseCase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerByEmail, createTheaterOwner, createTheatersOTP } } = dependencies;

  return {
    execute: async (data: ITheaterOwnerEntity): Promise<IResponse> => {
      try {
        const existingTheaterOwner = await findTheaterOwnerByEmail(data.email);
        if (existingTheaterOwner) {
          throw new CustomError('Email already exists', 409, 'email')
        }
        const hashedPassword = await hashPassword(data.password);
        const OTP = generateOTP();
        await createTheatersOTP(data.email, OTP)
        sendMail(data.email, 'OTP Verification', OTPTemplate(OTP));
        data.password = hashedPassword
        await createTheaterOwner(data);
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Theater Account created successfully',
          redirectURL: '/theaters/otp-verification',
          data: { email: data.email },
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  theaterSignupUseCase
}