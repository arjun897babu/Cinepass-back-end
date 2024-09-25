import { ObjectId } from "mongoose";
import { IMovie } from "../domain/entities/admin/ITheaterMovie";
import { IMovieShow, ITheaterOwnerEntity, ITheaterScreen } from "../domain/entities/theaters";
import { BookingStatus, MovieType, PaymentStatus, PurchasedItem, Role } from "./enum"
import { ITickets } from "../domain/entities/user/ITickets";


interface IPaymentMetaData {
  userId: string;
  purchasedItem: PurchasedItem;
  bookingDate: string;
  showId?: string;
  theaterId?: string;
  rentalId?: string;
  seats?: string;
}
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
  image: string;
  city: string;
  owner: ITheaterOwnerForTheater;
}

type TheaterOwnerProfile = Pick<ITheaterOwnerEntity, 'name' | 'email' | 'mobile_number' | 'adhaar_number'>;

type TheaterProfile = Pick<ITheaterOwnerEntity, 'theater_name' | 'theater_license' | 'address' | 'city' | 'image'>;

interface MovieFilter {
  bookingDate: Date;
  search: string;
  format: string;
  genre: string;
  language: string;
  nowShowing: boolean;
}

interface GetShowsParams {
  role: Role;
  _id: string | undefined;
  city: string | undefined;
  movieId?: string
  theaterId?: string
  showId?: string
  filter?: Partial<MovieFilter>
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
  movie: Pick<IMovie, 'movie_name' | 'movie_poster' | 'release_date'>
  theater: Pick<ITheaterOwnerEntity, 'theater_name' | 'city'>
  screen: ITheaterScreen;
  show: Pick<IMovieShow, 'showTime' | 'endTime' | 'format' | 'language' | '_id'>
}

interface IGetShowByTheater {

  _id: string;
  movie: Partial<IMovie>;
  shows: Array<{
    showDetails: Partial<IMovieShow>;
    screenDetails: Partial<ITheaterScreen>;
  }>;

}

interface MovieResponse {
  maxPage: number,
  movies: IMovie[] | []
}
interface IRental {
  planName: string,
  validity: number,
  price: number,
  listed: boolean
}

interface ICheckShowAvailableResponse {
  theaterDetails: Pick<ITheaterOwnerEntity, 'theater_name' | 'city' | '_id' | 'slug'>,
  screenDetails: Pick<ITheaterScreen, 'chargePerSeat' | 'screen_name' | 'layout' | 'amenity' | '_id'>[],
  showDetails: Pick<IMovieShow, 'movieId' | 'screenId' | 'reserved' | 'slug' | 'format' | 'language' | 'showTime'|'endTime'> & { showId: ObjectId },
  movieDetails: Pick<IMovie, 'movie_name' | 'movie_poster' | 'release_date'>
}

type TicketDataParams = Pick<ITickets, 'userId' | 'showId' | 'bookingDate' | 'bookingStatus' | 'seats' | 'paymentId'|'theaterId'>

interface TicketFilter {

  status: BookingStatus
}

export {
  TicketFilter,
  TicketDataParams,
  IPaymentMetaData,
  IRental,
  ICheckShowAvailableResponse,
  MovieResponse,
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
  IManageMovie,
  MovieFilter

}



