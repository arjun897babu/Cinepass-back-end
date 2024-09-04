import { ResponseStatus } from "../../../domain/entities/common";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";
import { IDependencies } from "../../interface/user/IDependencies";

const updateUserProfileUsecase = (dependencies: IDependencies) => {
  const { repositories: { updateUserProfile } } = dependencies;

  return {
    execute: async (_id: string, payload: Partial<UserEntity>) => {
      try {
        const updated = await updateUserProfile(_id, payload)
 
        return {
          status: ResponseStatus.SUCCESS,
          message: 'profile updated successfully',
          data: { user: updated }
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  updateUserProfileUsecase
}