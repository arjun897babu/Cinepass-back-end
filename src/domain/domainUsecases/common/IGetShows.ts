import { IResponse } from "..";
import { GetShowsParams } from "../../../utils/interface";

interface IGetShows {
  execute: ({ role, _id, city }: GetShowsParams) => Promise<IResponse>
}
export {
  IGetShows
}