import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { getMovies } from "./getMovies";
import { getAllMovieShows } from "./getMovieShowsController";
import { getRunningMovies } from "./getRunningMovies";
import { getTheater } from "./getTheater";
import { getTheaterScreen } from "./getTheaterScreen";

const commonController = (dependencies: ICommonDependencies) => {
  return {
    getTheaterScreen: getTheaterScreen(dependencies),
    getTheater: getTheater(dependencies),
    getMovies:getMovies(dependencies),
    getShows:getAllMovieShows(dependencies),
    getRunningMovies:getRunningMovies(dependencies)
  }
}

export {
  commonController
}

