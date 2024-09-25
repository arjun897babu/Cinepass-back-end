import { IGetShows, IGetTicketData, ITicketReservation, IWebhook } from "../../../domain/domainUsecases/common";
import { IGetMovies } from "../../../domain/domainUsecases/common/IGetMovies";
import { IGetRunningMovieUsecase } from "../../../domain/domainUsecases/common/IGetRunningMovieUsecase";
import { IGetTheaterUsecase } from "../../../domain/domainUsecases/common/IGetTheaterUsecase";
import { ICommonDependencies } from "./ICommonDependencies";

interface ICommonUsecase {
  getTheaterUsecase: (dependencies: ICommonDependencies) => IGetTheaterUsecase;
  getMoviesUsecase: (dependencies: ICommonDependencies) => IGetMovies;
  getShowsUsecase: (dependencies: ICommonDependencies) => IGetShows;
  getRunningMoviesUsecase: (dependencies: ICommonDependencies) => IGetRunningMovieUsecase;
  ticketReservation: (dependencies: ICommonDependencies) => ITicketReservation
  stripeWebhookEvents: (dependencies: ICommonDependencies) => IWebhook
  getTicketDataUsecase: (dependencies: ICommonDependencies) => IGetTicketData
}

export {
  ICommonUsecase
}