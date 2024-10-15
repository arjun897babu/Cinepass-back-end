import { ResponseStatus } from "../../../utils/enum";
import { GetShowsParams } from "../../../utils/interface";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

//get show details based on city and role (theater owner side and user side)
const getShowsUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getShows, getShowByTheater, getSingleShow } } = dependencies;

  return {
    execute: async ({ role, _id, city, theaterId, showId, filter }: GetShowsParams) => {

      try {
        let shows
        if (theaterId && city) {
          // Fetch shows for a specific theater in the user side based on `theaterId` and `city`
          shows = await getShowByTheater(theaterId, city)
        } else if (showId&&filter) {
          // Check if `showId` is provided for fetching details of a single show (user side for ticket booking)
          shows = await getSingleShow(showId,filter)
        } else {
          // Default case: fetch all shows related to a specific theater owner based on their role and city
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