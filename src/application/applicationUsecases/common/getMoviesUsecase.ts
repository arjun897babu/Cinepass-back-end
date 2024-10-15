import { CustomError } from "../../../utils/CustomError";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";
import {
  HttpStatusCode,
  MovieType,
  ResponseStatus,
  Role
} from "../../../utils/enum";

//use case for fetch all movies (theater movies and streaming movies) 
const getMoviesUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getMovies } } = dependencies

  return {
    execute: async (movieType: MovieType, role: Role, pageNumber: number) => {
      try {

        const movies = await getMovies(movieType, role, pageNumber);


        if (!movies) {
          throw new CustomError('No movies found', HttpStatusCode.NOT_FOUND, 'movies')
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Movie data fetched successfully',
          data: movies,
          redirectURL: '#'
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  getMoviesUsecase
}