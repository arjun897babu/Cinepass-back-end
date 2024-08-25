import { IResponse2 } from "..";
import { IMovieShow } from "../../entities/theaters";

interface IUpdateMovieShow {
  execute: (showId: string, payload: IMovieShow) => Promise<IResponse2>
}

export {
  IUpdateMovieShow
}