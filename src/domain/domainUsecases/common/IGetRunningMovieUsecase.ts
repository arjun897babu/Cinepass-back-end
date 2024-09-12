import { IResponse } from "..";
import { GetShowsParams } from "../../../utils/interface";

interface IGetRunningMovieUsecase {
  execute: ({ role, _id, city, filter }: GetShowsParams) => Promise<IResponse>
}
export {
  IGetRunningMovieUsecase
}