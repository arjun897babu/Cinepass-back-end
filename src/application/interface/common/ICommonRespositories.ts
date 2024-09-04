import { IMovie } from "../../../domain/entities/admin/ITheaterMovie"
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters"
import { MovieType, Role } from "../../../utils/enum"
import { GetShowsParams, IGetMovieShowResponse, IGetShowByTheater, IGetSingleShow } from "../../../utils/interface"

interface ICommonRepositories {
  getTheaterDetails: (_id: string) => Promise<ITheaterOwnerEntity>;
  getMovies: (movieType: MovieType, role: Role) => Promise<IMovie[] | []>
  getShows: ({ role, _id, city }: GetShowsParams) => Promise<IGetMovieShowResponse[] | []>
  getRunningMovies: ({ role, _id, city }: GetShowsParams) => Promise<any>
  getSingleRunningMovie: (movieId: string, city: string) => Promise<any>
  getTheaterByCity: (city: string) => Promise<Partial<ITheaterOwnerEntity>[]>
  getShowByTheater: (theaterId: string, city: string) => Promise<IGetShowByTheater>
  getSingleShow: (showId: string) => Promise<IGetSingleShow>
}
export {
  ICommonRepositories
}