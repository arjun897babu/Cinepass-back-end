 import { config } from "../../../config/envConfig"
import { ILogin,   LoginResponse } from "../../../domain/domainUsecases"
 import { comparePassword } from "../../../utils/bcrypt"
import { CustomError } from "../../../utils/CustomError"
import { generateToken } from "../../../utils/jwtHandler"
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies"
import { Role ,ResponseStatus} from "../../../utils/enum"

const adminLoginUseCase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { findAdmin } } = dependencies
  return {
    execute: async (data: ILogin): Promise<LoginResponse> => {
      try {
        const existingAdmin = await findAdmin(data.email);
        if (!existingAdmin) {
          throw new CustomError('email not found', 401, 'email')
        };

        const isPassword = await comparePassword(data.password, existingAdmin.password);

        if (!isPassword) {
          throw new CustomError('Password is incorrect', 400, 'password')
        }

        const adminId = existingAdmin._id?.toString();
        if (!adminId) {
          throw new CustomError('Email not found', 404, 'email');
        };

        const accessToken = generateToken({ _id: adminId, role: Role.admin }, config.secrets.access_token, '1d')
        // const refreshToken = generateToken({ _id: adminId, role: Role.admin }, config.secrets.refresh_token, '7d')

        return {
          message: 'Admin logged successfully',
          status: ResponseStatus.SUCCESS,
          accessToken: accessToken,
          data: { email: data.email },
          redirectURL: '/admin/home'
        }

      } catch (error) {
        throw error
      }
    }
  }
}
export {
  adminLoginUseCase
}