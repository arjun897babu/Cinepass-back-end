import { IResponse } from "..";
import { IMovieShow } from "../../entities/theaters";

interface IAddMovieShows{
  execute:(_id: string, payload: Omit<IMovieShow, 'theaterId'>)=>Promise<IResponse>
}

export {
  IAddMovieShows
}