import { config } from "../../../config/envConfig";
import { comparePassword } from "../../../utils/bcrypt";
import { CustomError } from "../../../utils/CustomError";
import { generateToken } from "../../../utils/jwtHandler";
import { IDependencies } from "../../interface/user/IDependencies"

const loginUseCase = (dependencies: IDependencies) => {
  const { repositories: { login } } = dependencies

  return {
    execute: async (email: string, password: string) => {
      try {
        const existingUser = await login(email);
        if (!existingUser) {
          throw new CustomError('Email not found', 404)
        }

        const comparedPassword = await comparePassword(password, existingUser.password);
        console.log('password compare:', comparedPassword)
        if (!comparedPassword) {
          throw new CustomError('Password mismatch', 401)
        }

        const userId = existingUser._id?.toString();
        if (!userId) {
          throw new CustomError('User ID not found', 500);
        }

        const accessToken = generateToken(userId, config.secrets.access_token, '1h')
        const refreshToken = generateToken(userId, config.secrets.refresh_token, '7d')

        return {
          accessToken,refreshToken
        }


      } catch (error) {
        throw error
      }
    }
  }
}

export {
  loginUseCase
}