import { IResponse2 } from "..";
import { MovieType } from "../../../utils/enum";
import { IMovie } from "../../entities/admin/ITheaterMovie";

interface IMovieResponse extends IResponse2{
  data:{movie:IMovie}
}

interface IUpdateMovie{
  execute:(movieId:string,payload: IMovie, movieType: MovieType, filePath?: string,publicId?:string)=>Promise<IMovieResponse>
}


export {
  IUpdateMovie
}