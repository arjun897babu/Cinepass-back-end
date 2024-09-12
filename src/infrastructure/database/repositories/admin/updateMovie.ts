import { Model, Types } from "mongoose";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";
import { MovieType, Role } from "../../../../utils/enum";
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { isCloudinaryUrl } from "../../../../utils/validator";
import { uploadImage } from "../../../cloudinary";


const model: Record<string, Model<IMovie>> = {
  [MovieType.THEATER]: TheaterMovie,

}

const updateMovie = async (movieId: string, payload: IMovie, movieType: MovieType): Promise<IMovie | null> => {
  try {
    const db = model[movieType];

    if (!isCloudinaryUrl(payload.cover_photo)) {
      payload.cover_photo = await uploadImage(payload.cover_photo, Role.theaters)
    }

    if (!isCloudinaryUrl(payload.movie_poster)) {
      payload.movie_poster = await uploadImage(payload.movie_poster, Role.theaters)
    }

    const movie = await db.findOneAndUpdate({ _id: movieId }, { ...payload }, { new: true })
     

    return movie ? movie : null

  } catch (error) {
    throw error
  }
}


export {
  updateMovie
}