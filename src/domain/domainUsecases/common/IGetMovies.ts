import { IResponse } from "..";
import { MovieType, Role } from "../../../utils/enum";

interface IGetMovies {
  execute: (movieType: MovieType, role: Role) => Promise<IResponse>
}

export {
  IGetMovies
}