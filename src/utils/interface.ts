import { ObjectId } from "mongoose";
import { IMovie } from "../domain/entities/admin/ITheaterMovie";
import { IMovieShow, ITheaterOwnerEntity, ITheaterScreen } from "../domain/entities/theaters";
import { BookingStatus, HTTPActions, MovieType, Period, PurchasedItem, Role } from "./enum"
import { ITickets } from "../domain/entities/user/ITickets";
import { ImageUploadResult } from "../infrastructure/cloudinary";
import { Request } from "express";


type IGetScreenCount = {
  total: number;
  available: number;
  'under-maintenance': number
}

type IGetTicketCount = {
  total: number,
  canceled: number
}

type IGetShowCountByScreen = {
  screenName: string,
  showCount: number
}
type RevenueByFilter = {
  period: Period
  screenId?: string;
  movieId?: string
}

interface IPaymentMetaData {
  userId: string;
  purchasedItem: PurchasedItem;
  bookingDate: string;
  showId?: string;
  theaterId?: string;
  rentalId?: string;
  seats?: string;
  screenId?: string
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

export interface TheaterMovieResponse {
  _id: ObjectId;
  movie_name: string;
  languages: string[];
  release_date: Date;
  run_time: string;
  genres: string[];
  format: string[];
  cover_photo: string;
  listed: boolean;
  movie_poster: string;
  slug: string
}


type IGetUserCount = {
  verified: number,
  active: number,
  blocked: number,
  nonVerified: number
}

type IGetTheaterOwnersCount = IGetUserCount & {
  approved: number
  rejected: number
  pending: number
}

interface IStreamMovieFilter {
  pageNumber: number,
  listed: boolean,
  nowShowing: boolean
}

interface IUserStreamProps {
  _id: string,
  movieId: string,
  publicId: string
  filter: Partial<IStreamMovieFilter>
}

type IPlan = {
  _id: ObjectId;
  planName: string;
  price: number;
  validity: number;
  listed: boolean;
}

export interface StreamingMovieResponse extends TheaterMovieResponse {
  plan: string;
  file: ImageUploadResult;
  streamingPlan: IPlan
  isPurchased: boolean
}
interface MovieResponse {
  maxPage: number,
  movies: (TheaterMovieResponse | StreamingMovieResponse)[]
}
interface IRental {
  planName: string,
  validity: number,
  price: number,
  listed: boolean
}

interface IStreamPlanFilter {
  pageNumber: number,
  listed: boolean,
  search: string,
  sort: boolean,
  all: boolean
}

interface IStreamPlanProps {
  action: HTTPActions,
  data?: Omit<IRental, 'listed'>,
  planId?: string,
  filter?: Partial<IStreamPlanFilter>
}


interface ICheckShowAvailableResponse {
  theaterDetails: Pick<ITheaterOwnerEntity, 'theater_name' | 'city' | '_id' | 'slug'>,
  screenDetails: Pick<ITheaterScreen, 'chargePerSeat' | 'screen_name' | 'layout' | 'amenity' | '_id'>[],
  showDetails: Pick<IMovieShow, 'movieId' | 'screenId' | 'reserved' | 'slug' | 'format' | 'language' | 'showTime' | 'endTime' | 'cancelationDeadline'> & { showId: ObjectId },
  movieDetails: Pick<IMovie, 'movie_name' | 'movie_poster' | 'release_date'>
}

type TicketDataParams = Pick<ITickets, 'userId' | 'showId' | 'bookingDate' | 'bookingStatus' | 'seats' | 'paymentId' | 'theaterId' | 'screenId'>

interface TicketFilter {
  status: BookingStatus
}
type IList = {
  name: string,
  id: string
}

type RevenueData = {
  [key: string]: number
}

type RevenueDetails = {
  name: string;
  id: string;
  data: RevenueData
}

interface IRevenueResponse {
  list: IList[]
  revenue: RevenueDetails
}

interface MulterRequest extends Request{
  file?:Express.Multer.File
  movieFile?:string
}

export {
  MulterRequest,
  IRevenueResponse,
  RevenueData,
  RevenueDetails,
  IStreamMovieFilter,
  IUserStreamProps,
  IStreamPlanProps,
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
  MovieFilter,
  IStreamPlanFilter,
  IGetTheaterOwnersCount,
  IGetUserCount,
  IGetScreenCount,
  IGetShowCountByScreen,
  IGetTicketCount,
  RevenueByFilter

}



