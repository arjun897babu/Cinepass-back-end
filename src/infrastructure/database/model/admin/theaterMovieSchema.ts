import { model, Schema } from "mongoose";
import { IMovie } from "../../../../domain/entities/admin/ITheaterMovie";
import slugify from "slugify";
import { createMovieSlug } from "../../../../utils/slugify";
import { MovieType } from "../../../../utils/enum";


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
  cover_photo: {
    type: String,
    required: true,
  },
  run_time: {
    type: String,
    required: true,
  },
  genres: {
    type: [String],
    required: true,

  },
  movie_poster: {
    type: String,
    required: true,
  },
  format: {
    type: [String],
    required: true,
  },
  slug: {
    type: String,
    unique: true
  }
});


theaterMovieSchema.pre('save', function (next) {

  if (!this.slug) {
    this.slug = createMovieSlug(this.movie_name,MovieType.THEATER )
  }
  next();
});


export const TheaterMovie = model<IMovie>('TheaterMovie', theaterMovieSchema);
