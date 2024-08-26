import { IMovie } from "../../../domain/entities/admin/ITheaterMovie";
import { ResponseStatus } from "../../../domain/entities/common";
import { CustomError } from "../../../utils/CustomError";
import { MovieType } from "../../../utils/enum";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const updateMovieUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { updateMovie } } = dependencies
  return {
    execute: async (movieId:string,payload: IMovie, movieType: MovieType) => {
      try {
        const movie = await updateMovie(movieId,payload,movieType)

        if(!movie){
          throw new CustomError('no data found',404,'movie')
        }

        return {
          status:ResponseStatus.SUCCESS,
          message:'Movie updated Succcessfully',
          data:{movie}
        }
      } catch (error) {
        throw error
      }
    }
  }
}


export {
  updateMovieUsecase
}