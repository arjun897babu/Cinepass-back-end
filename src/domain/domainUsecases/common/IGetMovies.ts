import { IResponse2 } from "..";
import { MovieType, Role } from "../../../utils/enum";
import { MovieResponse } from "../../../utils/interface";
 
interface IGetMoviesResponse extends IResponse2 {
  data:MovieResponse
 }

interface IGetMovies {
  execute: (movieType: MovieType, role: Role, pageNumber: number) => Promise<IGetMoviesResponse>
}

export {
  IGetMovies
}