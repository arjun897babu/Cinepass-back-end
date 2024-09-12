 
import { ResponseStatus } from "../../../utils/enum";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";
//theater details for theater owners and user return array of list
const getTheaterUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getTheaterDetails, getTheaterByCity } } = dependencies
  return {
    execute: async (_id: string, city?: string) => {
      try {

        let theaters
        if (city) {
          theaters = await getTheaterByCity(city)
        } else {
          theaters = await getTheaterDetails(_id);
        }
        
        return {
          status: ResponseStatus.SUCCESS,
          message: 'data fetched successfully',
          data: { theater: theaters }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getTheaterUsecase
}