import { IReservedSeats, ITheaterOwnerEntity } from "../../../domain/entities/theaters"
import { MovieType, Role } from "../../../utils/enum"
import { MovieResponse, GetShowsParams, IGetMovieShowResponse, IGetShowByTheater, IGetSingleShow, MovieFilter, ICheckShowAvailableResponse } from "../../../utils/interface"

interface ICommonRepositories {
  getTheaterDetails: (_id: string) => Promise<ITheaterOwnerEntity>;
  getMovies: (movieType: MovieType, role: Role, pageNumber: number) => Promise<MovieResponse>
  getShows: ({ role, _id, city }: GetShowsParams) => Promise<IGetMovieShowResponse[] | []>
  getRunningMovies: ({ role, _id, city, filter }: GetShowsParams) => Promise<any>
  getSingleRunningMovie: (movieId: string, city: string, { }: Partial<MovieFilter>) => Promise<any>
  getTheaterByCity: (city: string) => Promise<Partial<ITheaterOwnerEntity>[]>
  getShowByTheater: (theaterId: string, city: string) => Promise<IGetShowByTheater>
  getSingleShow: (showId: string,filter:Partial<MovieFilter>) => Promise<IGetSingleShow>
  checkShowAvailable: (showId: string, payload: IReservedSeats) => Promise<ICheckShowAvailableResponse>,
 }
export {
  ICommonRepositories
}