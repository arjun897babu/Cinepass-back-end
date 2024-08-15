import { Console } from "console";
import { IResponse2 } from "..";
import { IManageMovie } from "../../../utils/interface";

interface IMangeMovieResponse extends IResponse2 {
  data: { movie: IManageMovie }
}

interface IManageMovieList {
  execute: (payload: IManageMovie) => Promise<IMangeMovieResponse>
}

export {
  IManageMovieList
}