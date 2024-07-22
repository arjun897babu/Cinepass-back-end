import { IResponse } from "../../../domain/domainUsecases";
import { ResponseStatus } from "../../../domain/entities/common";
import { comparePassword, hashPassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { IResetPassword } from "../../../utils/interface";
import { IDependencies } from "../../interface/user/IDependencies";

const resetPasswordUsecase = (dependencies: IDependencies) => {
  const { repositories: { resetPassword, findUserById } } = dependencies;

  return {
    execute: async (payload: IResetPassword): Promise<IResponse> => {

      try {
        const existingUser = await findUserById(payload._id);
        if (!existingUser) {
          throw new CustomError('User not found', 404, 'user')
        }
        const isPassword = await comparePassword(payload.password, existingUser.password as string);
        if (isPassword) {
          throw new CustomError('Please Enter a  new Password', 404, 'password')
        }

        const hashedPassword = await hashPassword(payload.password);
        await resetPassword({ ...payload, password: hashedPassword })

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Password updated successfully',
          redirectURL:'/login'
        }
      } catch (error) {
        throw error
      }
    }
  }

}

export {
  resetPasswordUsecase
}