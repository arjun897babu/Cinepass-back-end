import { Model } from "mongoose";
import { MovieType } from "../../../../utils/enum";
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { IManageMovie } from "../../../../utils/interface";
import { StreamingMovie } from "../../model/admin/streaming-movie";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";

const model: Record<string, Model<IMovie>> = {
  [MovieType.THEATER]: TheaterMovie,
  [MovieType.STREAM]: StreamingMovie

};

const deleteMovie = async (payload: IManageMovie): Promise<IManageMovie | null> => {
  const db = model[payload.movieType];
  try {
    const deletedMovie = await db.findOneAndUpdate({ _id: payload.movieId }, [{ $set: { listed: { $not: "$listed" } } }]
      , { new: true, projection: { listed: 1, _id: 1 } }
    ).lean()


    return deletedMovie ?
      {
        movieId: `${deletedMovie._id}`,
        movieType: payload.movieType, 
        listed: deletedMovie.listed
      }
      : null

  } catch (error) {

    throw error
  }
}

export {
  deleteMovie
}