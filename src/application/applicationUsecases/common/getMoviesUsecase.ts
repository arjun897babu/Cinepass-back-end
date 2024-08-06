import { ResponseStatus } from "../../../domain/entities/common";
import { MovieType } from "../../../utils/enum";
import { ICommonDependencies } from "../../interface/common/ICommonDependencies";

const getMoviesUsecase = (dependencies: ICommonDependencies) => {
  const { commonRepositories: { getMovies } } = dependencies

  return {
    execute: async (movieType: MovieType) => {
      try {
        const movies = await getMovies(movieType);

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Movie data fetched successfully',
          data: { movies },
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