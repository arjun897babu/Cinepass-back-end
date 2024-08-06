import { Model } from "mongoose";
import { MovieType } from "../../../../utils/enum"
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";


const model: Record<string, Model<any>> = {
  [MovieType.THEATER]: TheaterMovie,

};


const addMovie = async (payload: IMovie, movieType: MovieType): Promise<IMovie> => {
  try {
    const db = model[movieType];

    const movie = await db.create(payload);
    
    return movie

  } catch (error) {
    throw error
  }
}


export {
  addMovie
}