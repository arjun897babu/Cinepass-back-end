import { IResponse } from "..";
import { GetShowsParams } from "../../../utils/interface";

interface IGetRunningMovieUsecase {
  execute: ({ role, _id, city }: GetShowsParams) => Promise<IResponse>
}
export {
  IGetRunningMovieUsecase
}