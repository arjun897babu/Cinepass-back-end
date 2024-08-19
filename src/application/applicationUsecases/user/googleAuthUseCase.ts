import e from "cors"
import { IResponse, LoginResponse } from "../../../domain/domainUsecases"
import { ResponseStatus } from "../../../domain/entities/common"
import { UserEntity } from "../../../domain/entities/user/IUserEntity"
import { CustomError } from "../../../utils/CustomError"
import { IDependencies } from "../../interface/user/IDependencies"
import { generateToken } from "../../../utils/jwtHandler"
import { config } from "../../../config/envConfig"
import { Role } from "../../../utils/enum"

const handleUserResponse = (user: UserEntity): LoginResponse => {
  const userId = user._id?.toString();
  console.log(user)
  if (!userId) {
    throw new CustomError('Email not found', 404, 'email');
  }

  const { password,googleId, ...rest } = user;
  const accessToken = generateToken({ _id: userId, role: Role.users }, config.secrets.access_token, '1h')

  return {   
    message: 'Logged successfully',
    status: ResponseStatus.SUCCESS,
    data: { ...rest },
    redirectURL: '/',
    accessToken
  };
} 

const googleAuthUsecase = (dependencies: IDependencies) => {
  const { repositories: { login, signUp } } = dependencies
  return {
    execute: async (data: UserEntity): Promise<LoginResponse> => {
      try {  

        const existingUser = await login(data.email);
        if(!existingUser?.status){

          throw new CustomError('Account is blocked', 403, 'blocked');
        }
        if (!existingUser) {
          const newUser = await signUp({ ...data, isGoogleAuth: true, verified: true, profile_picture: data.profile_picture });

          if (!newUser) {
            throw new CustomError('Something went wrong during sign up', 500, 'googleAuth');
          }
          return handleUserResponse(newUser);
        }

        return handleUserResponse(existingUser);

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  googleAuthUsecase
}

