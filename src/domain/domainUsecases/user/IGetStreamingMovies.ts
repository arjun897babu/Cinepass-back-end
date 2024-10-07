import { IResponse2 } from "..";
import { IUserStreamProps, StreamingMovieResponse } from "../../../utils/interface";


export interface IStreamingMovieResponse {
  maxPage: number;
  data: StreamingMovieResponse[]
}

interface IGetStreamingMoviesResponse extends IResponse2 {
  data: IStreamingMovieResponse | StreamingMovieResponse
}

interface IGetStreamingMovies {
  execute: (props: Partial<IUserStreamProps>) => Promise<IGetStreamingMoviesResponse>
}

export {
  IGetStreamingMovies
}