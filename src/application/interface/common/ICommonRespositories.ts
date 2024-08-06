import { IMovie } from "../../../domain/entities/admin/ITheaterMovie";
import { ITheaterScreen } from "../../../domain/entities/theaters";
import { MovieType } from "../../../utils/enum";
import { GetShowsParams, IGetMovieShowResponse, ITheaterDetailResponse } from "../../../utils/interface";

interface ICommonRepositories {
  getTheaterScreen: () => Promise<ITheaterScreen[] | []>;
  getTheaterDetails: (_id: string) => Promise<ITheaterDetailResponse | undefined>;
  getMovies: (movieType: MovieType) => Promise<IMovie[] | []>
  getShows: ({ role, _id, city }: GetShowsParams) => Promise<IGetMovieShowResponse[] | []>
  getRunningMovies:({ role, _id, city }: GetShowsParams)=>Promise<any>
}
export {
  ICommonRepositories
}