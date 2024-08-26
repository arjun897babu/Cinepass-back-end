import { Model, Types } from "mongoose";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";
import { MovieType } from "../../../../utils/enum";
import { TheaterMovie } from "../../model/admin/theaterMovieSchema";
 

const model: Record<string, Model<IMovie>> = {
  [MovieType.THEATER]: TheaterMovie,

}

const updateMovie = async (movieId: string, payload: IMovie, movieType: MovieType): Promise<IMovie | null> => {
  try {
    const db = model[movieType];
    console.log('in update Movie repository', db)
    console.log('in update Movie repository', payload)
    const movie = await db.findOneAndUpdate({ _id: movieId }, { ...payload }, { new: true })
    console.log(movie)

    return movie ? movie : null

  } catch (error) {
    throw error
  }
}


export {
  updateMovie
}