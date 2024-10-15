import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { IManageMovie } from "../../../utils/interface";
import { IAdminDependencies } from "../../interface/admin/IAdminDependencies";

const manangeMovieUsecase = (dependencies: IAdminDependencies) => {
  const { adminRepositories: { deleteMovie } } = dependencies

  return {
    execute: async (payload: IManageMovie) => {
      try {
        const deletedMovie = await deleteMovie(payload);
        if (!deletedMovie) {
          throw new CustomError('Movie not found', 404, 'movie')
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: deletedMovie.listed ?
            'Movie restored successfully'
            : 'Movie Deleted successfully',
          data: { movie: deletedMovie }
        }

      } catch (error) {
        throw error
      }
    }
  }
}

export {
  manangeMovieUsecase
}