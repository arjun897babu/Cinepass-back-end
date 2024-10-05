import { IResponse } from "..";
import { MovieType } from "../../../utils/enum";
import { IMovie } from "../../entities/admin/ITheaterMovie";

interface IAdminAddMovie {
  execute: (payload: IMovie, movieType: MovieType, filePath?: string) => Promise<IResponse>
}

export {
  IAdminAddMovie
}