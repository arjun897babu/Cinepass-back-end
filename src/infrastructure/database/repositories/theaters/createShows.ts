import { IMovieShow } from "../../../../domain/entities/theaters";
import { CustomError } from "../../../../utils/CustomError";
import { MovieShow } from "../../model/theaters";

const createMovieShows = async (_id: string, payload: Omit<IMovieShow, 'theaterId'>): Promise<IMovieShow> => {
  try {
    const isExists = await MovieShow.exists({
      screenId: payload.screenId,
      movieId: payload.movieId,
      language: payload.language,
      format: payload.format,
    })
    console.log('in create movieshow repositories', isExists)
    if (isExists) {
      throw new CustomError('show exists', 400, 'movieId')
    }

    const newShow = await MovieShow.create({ theaterId: _id, ...payload });
    return newShow;
  } catch (error) {
    throw error
  }
};

export {
  createMovieShows
};
