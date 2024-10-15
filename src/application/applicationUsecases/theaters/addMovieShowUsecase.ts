import { IMovieShow } from "../../../domain/entities/theaters";
import { ResponseStatus } from "../../../utils/enum";
import { ITheaterDependencies } from "../../interface/theaters/ITheaterDependencies";

const addMovieShowUsecase = (dependencies: ITheaterDependencies) => {
  const { theaterRepositories: { createMovieShows } } = dependencies
  return {
    execute: async (_id: string, payload: Omit<IMovieShow, 'theaterId'>) => {
      try {
        const show = await createMovieShows(_id, payload);
        return {
          status: ResponseStatus.SUCCESS,
          message: 'Show created successfully',
          data: { show }
        }
      } catch (error) {
        throw error
      }
    }
  }
}

export {
  addMovieShowUsecase
}