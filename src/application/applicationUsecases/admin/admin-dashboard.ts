 import { ResponseStatus } from "../../../utils/enum";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";
import { IDependencies } from "../../interface/user/IDependencies";

const entityStat = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { getUserCount, getTheaterOwnersCount } } = dependencies;
  return {
    execute: async () => {
      try {
        const [userStat, theaterStat] = await Promise.all([getUserCount(), getTheaterOwnersCount()])

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data fetched Successfully',
          data: {
            userStat,
            theaterStat
          }
        }

      } catch (error) {
        throw error
      }
    }
  }
}

const streamingMovieStat = (dependencies: IDependencies) => {
  const { repositories: { } } = dependencies

  return {
    execute: async () => {
      try {

      } catch (error) {
        throw error
      }
    }
  }
}

const theaterMovieStat = (dependencies: IDependencies) => {
  const { } = dependencies

  return {
    execute: async () => {
      try {

      } catch (error) {
        throw error
      }
    }
  }
}

const adminDashboard = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { } } = dependencies

}

export {
  entityStat,
  streamingMovieStat,
  theaterMovieStat
}