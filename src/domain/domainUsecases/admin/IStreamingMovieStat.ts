import { IResponse2 } from "..";
import { IRevenueResponse, RevenueByFilter } from "../../../utils/interface";

interface IStreamingMovieStatResponse extends IResponse2 {
  data: IRevenueResponse
}

interface IStreamingMovieStat {
  execute: (filter: RevenueByFilter) => Promise<IStreamingMovieStatResponse>
}

export {
  IStreamingMovieStat
}