import { IGetShows } from "../../../domain/domainUsecases/common";
import { IGetMovies } from "../../../domain/domainUsecases/common/IGetMovies";
import { IGetRunningMovieUsecase } from "../../../domain/domainUsecases/common/IGetRunningMovieUsecase";
import { IGetTheaterScreenUsecase } from "../../../domain/domainUsecases/common/IGetTheaterScreenUsecase";
import { IGetTheaterUsecase } from "../../../domain/domainUsecases/common/IGetTheaterUsecase";

interface ICommonUsecase {
  getTheaterScreenUsecase: (dependencies: any) => IGetTheaterScreenUsecase;
  getTheaterUsecase: (dependencies: any) => IGetTheaterUsecase;
  getMoviesUsecase: (dependencies: any) => IGetMovies;
  getShowsUsecase: (dependencies: any) => IGetShows;
  getRunningMoviesUsecase: (dependencies: any) => IGetRunningMovieUsecase;
}

export {
  ICommonUsecase
}