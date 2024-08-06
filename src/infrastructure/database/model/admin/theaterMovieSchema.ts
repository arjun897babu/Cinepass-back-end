import { model, Schema } from "mongoose";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";

// const castSchema = new Schema({
//   image: {
//     type: String,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//     lowercase: true,
//   },
// });

const theaterMovieSchema = new Schema<IMovie>({
  movie_name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true
  },
  languages: {
    type: [String],
    required: true,

  },
  listed: {
    type: Boolean,
    default: true,
  },
  release_date: {
    type: Date,
    required: true,
  },
  // cover_photo: {
  //   type: String,
  //   required: true,
  // },
  run_time: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,

  },
  // movie_poster: {
  //   type: String,
  //   required: true,
  // },
  format: {
    type: [String],
    required: true,

  },
});

export const TheaterMovie = model<IMovie>('TheaterMovie', theaterMovieSchema);
