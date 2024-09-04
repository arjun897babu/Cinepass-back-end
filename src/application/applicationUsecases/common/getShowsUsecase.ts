import { ResponseStatus } from "../../../domain/entities/common";
import { Role } from "../../../utils/enum";
import { GetShowsParams } from "../../../utils/interface";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";
//get show details based on city and role (theater owner side and user side)
const getShowsUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getShows, getShowByTheater, getSingleShow } } = dependencies;

  return {
    execute: async ({ role, _id, city, theaterId, showId }: GetShowsParams) => {
 
      try {
        let shows
        if (theaterId && city) {
          shows = await getShowByTheater(theaterId, city)
        } else if (showId) {
          shows = await getSingleShow(showId)
        } else {
          shows = await getShows({ role, _id, city })
        }
        
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