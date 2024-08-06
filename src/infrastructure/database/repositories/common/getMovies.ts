import { Model } from "mongoose";
import { MovieType } from "../../../../utils/enum";
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";

const model: Record<string, Model<any>> = {
  [MovieType.THEATER]: TheaterMovie
};

const getMovies = async (movieType: MovieType): Promise<IMovie[] | []> => {
  try {
    const db = model[movieType];
    const response = await db.aggregate([
      {
        $match: {}
      },
      {
        $sort: { _id: -1 }
      }
    ])

    return response
  } catch (error) {
    throw error
  }
}

export {
  getMovies
}