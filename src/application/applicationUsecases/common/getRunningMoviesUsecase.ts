import { ResponseStatus } from "../../../domain/entities/common";
import { GetShowsParams } from "../../../utils/interface";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

const getRunningMoviesUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getRunningMovies } } = dependencies;
  return {
    execute: async ({ role, _id, city }: GetShowsParams) => {
      try {

        const movies = await getRunningMovies({ role, _id, city })

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data fetched successfully',
          data: { movies }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export{
  getRunningMoviesUsecase
}