import { IResponse } from "..";
import { MovieType } from "../../../utils/enum";

interface IGetMovies {
  execute: (movieType: MovieType) => Promise<IResponse>
}

export {
  IGetMovies
}