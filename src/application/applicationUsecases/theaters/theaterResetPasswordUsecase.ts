import { IResponse } from "../../../domain/domainUsecases";
import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { IResetPassword } from "../../../utils/interface";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";
import {
  comparePassword,
  hashPassword
} from "../../../utils/bcrypt";


const theaterResetPasswordUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerById, resetPasswordTheaters } } = dependencies;

  return {
    execute: async (payload: IResetPassword): Promise<IResponse> => {

      try {
        const existingTheaterOwner = await findTheaterOwnerById(payload._id);
        if (!existingTheaterOwner) {
          throw new CustomError('Account not found', 404, 'email')
        }

        //For blocked accounts
        if (!existingTheaterOwner.status) {
          throw new CustomError('Your account is blocked', 403, 'blocked')
        };

        const isPassword = await comparePassword(payload.password, existingTheaterOwner.password);
        if (isPassword) {
          throw new CustomError('Please Enter a  new Password', 400, 'password')
        }

        const hashedPassword = await hashPassword(payload.password);
        await resetPasswordTheaters({ ...payload, password: hashedPassword })

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Password updated successfully',
          redirectURL: '/theaters/login'
        }
      } catch (error) {
        throw error
      }
    }
  }

}

export {
  theaterResetPasswordUsecase
}