 import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const deleteMovieShowUsecase = (dependecies: ITheaterDependencies) => {
  const { theaterRepositories: { deleteMovieshow } } = dependecies;
  return {
    execute: async (showId: string) => {
      try {
        const isDeleted = await deleteMovieshow(showId)
        if (!isDeleted) {
          throw new CustomError('show not found', 404, 'show')
        }

        return {
          status: ResponseStatus.SUCCESS,
          message: 'Show deleted successfully',
          data: { _id: showId }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  deleteMovieShowUsecase
}