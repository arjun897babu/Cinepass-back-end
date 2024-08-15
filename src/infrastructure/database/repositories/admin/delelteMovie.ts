import { Model } from "mongoose";
import { MovieType } from "../../../../utils/enum";
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { IManageMovie } from "../../../../utils/interface";

const model: Record<string, Model<any>> = {
  [MovieType.THEATER]: TheaterMovie,

};

const deleteMovie = async (payload: IManageMovie): Promise<IManageMovie | null> => {
  const db = model[payload.movieType];
  try {
    const deletedMovie = await db.findOneAndUpdate({ _id: payload.movieId }, [{ $set: { listed: { $not: "$listed" } } }]
      , { new: true, projection: { listed: 1, _id: 1 } }
    )

    return deletedMovie

  } catch (error) {
    throw error
  }
}

export {
  deleteMovie
}