import { ICommonDependencies } from "../../../application/interface/common/ICommonDependencies";
import { getMovies } from "./getMovies";
import { getAllMovieShows } from "./getMovieShowsController";
import { getRunningMovies } from "./getRunningMovies";
import { getTheater } from "./getTheater";

const commonController = (dependencies: ICommonDependencies) => {
  return {
    getTheater: getTheater(dependencies),
    getMovies:getMovies(dependencies),
    getShows:getAllMovieShows(dependencies),
    getRunningMovies:getRunningMovies(dependencies)
  }
}

export {
  commonController
}

