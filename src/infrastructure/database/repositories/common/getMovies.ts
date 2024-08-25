import { Model } from "mongoose";
import { MovieType, Role } from "../../../../utils/enum";
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";

const model: Record<string, Model<any>> = {
  [MovieType.THEATER]: TheaterMovie
};

const getMovies = async (movieType: MovieType, role: Role): Promise<IMovie[] | []> => {
  try {
    const db = model[movieType];

    let matchQuery = role === Role.admin ?
      { listed: true }
      : {
        listed: true,
        release_date: { $gt: new Date() }
      }
    const response = await db.aggregate([
      {
        $match: matchQuery
      },
      {
        $sort: { release_date: -1 }
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