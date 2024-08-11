
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
  listed?: boolean;
  movie_poster: string;
  cast?: ICast[];
  trailer?: string;
  file?: string
  slug?: string
}


export {
  IMovie
}