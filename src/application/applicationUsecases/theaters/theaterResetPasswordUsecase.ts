import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { comparePassword, hashPassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { IResetPassword } from "../../../utils/interface";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";
 

const theaterResetPasswordUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { findTheaterOwnerById, resetPasswordTheaters } } = dependencies;

  return {
    execute: async (payload: IResetPassword): Promise<IResponse> => {

      try {
        const existingTheaterOwner = await findTheaterOwnerById(payload._id);
        if (!existingTheaterOwner) {
          throw new CustomError('User not found', 404, 'user')
        }
        const isPassword = await comparePassword(payload.password, existingTheaterOwner.password);
        if (isPassword) {
          throw new CustomError('Please Enter a  new Password', 404, 'password')
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