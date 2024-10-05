import { Document, ObjectId } from "mongoose";
import { ImageUploadResult } from "../../../infrastructure/cloudinary";

interface ICast {
  image: string;
  name: string;
}

interface IMovie extends Document {
  movie_name: string;
  languages: string[];
  release_date: Date;
  run_time: string;
  genres: string[];
  format: string[];
  cover_photo: string;
  listed: boolean;
  movie_poster: string;
  cast?: ICast[];
  trailer?: string;
  plan?: ObjectId;
  file?: ImageUploadResult
  slug: string
}


export {
  IMovie
}