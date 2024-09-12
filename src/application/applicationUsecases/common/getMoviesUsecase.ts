 import { MovieType, ResponseStatus, Role } from "../../../utils/enum";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

//use case for fetch all movies (theater movies and streaming movies) 
const getMoviesUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getMovies } } = dependencies

  return {
    execute: async (movieType: MovieType, role: Role, pageNumber: number) => {
      try {
        const movies = await getMovies(movieType, role, pageNumber);

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Movie data fetched successfully',
          data:  movies ,
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