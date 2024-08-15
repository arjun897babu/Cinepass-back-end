import { IMovie } from "../domain/entities/admin/ITheaterMovie";
import { ITheaterOwnerEntity, ITheaterScreen } from "../domain/entities/theaters";
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

interface ITheaterUpdateInfoPayload {
  theater_name: string,
  theater_license: string,
  city: string,
  address: string,
  images: string[]
}

interface GetShowsParams {
  role: Role;
  _id: string | undefined;
  city: string | undefined;
  movieId?: string
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
  listed?:boolean
}

export {
  IResetPassword,
  TokenPayload,
  ICityUpdate,
  ITheaterDetailResponse,
  ITheaterUpdateInfoPayload,
  GetShowsParams,
  IGetMovieShowResponse,
  IManageMovie

}

