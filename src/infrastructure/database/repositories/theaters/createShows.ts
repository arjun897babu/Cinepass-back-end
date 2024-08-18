import { IMovieShow } from "../../../../domain/entities/theaters";
import { MovieShow } from "../../model/theaters";

const createMovieShows = async (_id: string, payload: Omit<IMovieShow, 'theaterId'>): Promise<IMovieShow> => {
  try {
   
    const newShow = await MovieShow.create({ theaterId: _id, ...payload });
    return newShow;
  } catch (error) {
    throw error
  }
};

export {
  createMovieShows
};
