import { IResponse, IResponse2 } from "..";
import { GetShowsParams, IGetMovieShowResponse, IGetShowByTheater, IGetSingleShow } from "../../../utils/interface";

interface IGetshowResponse extends IResponse2 {
  data: {
    shows: (IGetShowByTheater | IGetSingleShow | IGetMovieShowResponse[] |  [])
  }
}

interface IGetShows {
  execute: ({ role, _id, city, theaterId, showId }: GetShowsParams) => Promise<IGetshowResponse>
}
export {
  IGetShows
}