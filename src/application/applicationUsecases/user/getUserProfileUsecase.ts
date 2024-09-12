import { ResponseStatus } from "../../../utils/enum";;
import { IDependencies } from "../../interface/user/IDependencies";

const getUserProfileUsecase = (dependencies: IDependencies) => {
  const { repositories: { getUserProfile } } = dependencies
  return {
    execute: async (_id: string) => {
      try {
        const user = await getUserProfile(_id)
        return {
          status: ResponseStatus.SUCCESS,
          message: 'data fetched successfully',
          data: { user }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getUserProfileUsecase
}