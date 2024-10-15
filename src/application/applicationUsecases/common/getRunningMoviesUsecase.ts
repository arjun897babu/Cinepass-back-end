import { ResponseStatus } from "../../../utils/enum";
import { GetShowsParams } from "../../../utils/interface";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";
//use case for getting available movies in theater based on city
const getRunningMoviesUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getRunningMovies, getSingleRunningMovie } } = dependencies;
  return {
    execute: async ({ role, _id, city, movieId, filter = {} }: GetShowsParams) => {

      const { bookingDate,format,genre,language, search } = filter
       try {
        let movies

        if (movieId && city) {
          movies = await getSingleRunningMovie(movieId, city, { bookingDate }) 
        } else {
          movies = await getRunningMovies({ role, _id, city,filter})  
        }

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

export {
  getRunningMoviesUsecase
}