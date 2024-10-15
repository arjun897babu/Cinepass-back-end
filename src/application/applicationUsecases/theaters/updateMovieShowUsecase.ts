import { IMovieShow } from "../../../domain/entities/theaters";
import { CustomError } from "../../../utils/CustomError";
import { ResponseStatus } from "../../../utils/enum";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies"

const updateMovieShowUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { updateMovieShow } } = dependencies;
  return {
    execute: async (showId: string, payload: IMovieShow) => {
      const updated = await updateMovieShow(showId, payload);
      if (!updated) {
        throw new CustomError('show  not found', 404, 'show')
      }
      console.log(updated)
      return {
        status: ResponseStatus.SUCCESS,
        message: 'Show updated Successfully'
      }
    }
  }
}

export {
  updateMovieShowUsecase
}