import { IResponse2 } from "..";
import { MovieType } from "../../../utils/enum";
import { IMovie } from "../../entities/admin/ITheaterMovie";

interface IMovieResponse extends IResponse2{
  data:{movie:IMovie}
}

interface IUpdateMovie{
  execute:(movieId:string,payload: IMovie, movieType: MovieType)=>Promise<IMovieResponse>
}


export {
  IUpdateMovie
}