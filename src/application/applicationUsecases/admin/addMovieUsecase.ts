import { IMovie } from "../../../domain/entities/admin/ITheaterMovie";
 import { MovieType, ResponseStatus } from "../../../utils/enum";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const addMovieUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { addMovie } } = dependencies

  return {
    execute: async (payload: IMovie, movieType: MovieType) => {
      try {
        console.log('payload in adminaddmovie usecase',payload)
        const newMovie = await addMovie(payload , movieType);

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Movie added successfully',
          data: { movie: newMovie },
          redirectURL: '#'
        }
      } catch (error) {

        throw error
      }
    }
  }
}
export {
  addMovieUsecase
}