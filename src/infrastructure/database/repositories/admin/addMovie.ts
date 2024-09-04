import { Model } from "mongoose";
import { MovieType, Role } from "../../../../utils/enum"
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";
import { CustomError } from "../../../../utils/CustomError";
import { uploadImage } from "../../../cloudinary";


const model: Record<string, Model<any>> = {
  [MovieType.THEATER]: TheaterMovie,

};


const addMovie = async (payload: IMovie, movieType: MovieType): Promise<IMovie> => {
  try {

    const db = model[movieType];

    const existingMovie = await db.exists(
      {
        movie_name: {
          $regex: new RegExp(`^${payload.movie_name}$`, 'i')
        }
      })


    if (existingMovie) {
      throw new CustomError('Movie already exists', 409, 'movie_name')
    }

    const movie_poster = await uploadImage(payload.movie_poster, Role.admin)
    const cover_photo = await uploadImage(payload.cover_photo, Role.admin)

    const newMovie = movieType === MovieType.THEATER ?
      await db.create({ ...payload, movie_poster, cover_photo })
      : await db.create(payload)

    return newMovie

  } catch (error) {
    throw error
  }
}


export {
  addMovie
}