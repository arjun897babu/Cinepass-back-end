import { IMovie } from "../domain/entities/admin/ITheaterMovie";
import { IMovieShow, ITheaterOwnerEntity, ITheaterScreen } from "../domain/entities/theaters";
import { MovieType, Role } from "./enum"

interface ICityUpdate {
  _id: string,
  city: string
}

interface IResetPassword {
  _id: string,
  password: string
}
interface TokenPayload {
  _id: string,
  role: Role
}

interface ITheaterOwnerForTheater {
  _id: string;
  name: string;
  email: string;
  mobile_number: number;
}

interface ITheaterDetailResponse {
  _id: string;
  theater_Name: string;
  theater_license: string;
  address: string;
  images: string[];
  city: string;
  owner: ITheaterOwnerForTheater;
}

type TheaterOwnerProfile = Pick<ITheaterOwnerEntity, 'name' | 'email' | 'mobile_number' | 'adhaar_number'>;

type TheaterProfile = Pick<ITheaterOwnerEntity, 'theater_name' | 'theater_license' | 'address' | 'city' | 'images'>;



interface GetShowsParams {
  role: Role;
  _id: string | undefined;
  city: string | undefined;
  movieId?: string
  theaterId?: string
  showId?: string
}

interface IGetMovieShowResponse {
  _id: string,
  showTime: string,
  theater: Pick<ITheaterOwnerEntity, 'address' | 'city' | 'theater_name'>
  movie: IMovie,
  screen: Pick<ITheaterScreen, '_id' | 'amenity' | 'screen_name'>
}

interface IManageMovie {
  movieType: MovieType;
  movieId: string
  listed?: boolean
}


interface IGetSingleShow {
  movie: {
    movie_name: Pick<IMovie, 'movie_name'>
  };
  theater: {
    theater_name: Pick<ITheaterOwnerEntity, 'theater_name'>
  };
  screen: {
    name: Pick<ITheaterScreen, 'screen_name'>;
    layout: Pick<ITheaterScreen, 'layout'>;
  };
  show: Partial<IMovieShow>
}

interface IGetShowByTheater {

  _id: string;
  movie: Partial<IMovie>;
  shows: Array<{
    showDetails: Partial<IMovieShow>;
    screenDetails: Partial<ITheaterScreen>;
  }>;

}

 

export {
  IGetShowByTheater,
  IGetSingleShow,
  IResetPassword,
  TokenPayload,
  ICityUpdate,
  ITheaterDetailResponse,
  TheaterOwnerProfile,
  TheaterProfile,
  GetShowsParams,
  IGetMovieShowResponse,
  IManageMovie

}



