import { ResponseStatus } from "../../../domain/entities/common";
import { GetShowsParams } from "../../../utils/interface";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

const getShowsUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getShows } } = dependencies;

  return {
    execute: async ({ role, _id, city }: GetShowsParams) => {
      try {
        const shows = await getShows({ role, _id, city })
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Data fetched successfully',
          data: { shows }
        }
      } catch (error) {
        throw error
      }
    }
  }
}
export {
  getShowsUsecase
}