import { IResponse2 } from "..";
import { IRevenueResponse, RevenueByFilter } from "../../../utils/interface";

interface IGetRevenueByScreenResponse extends IResponse2 {
  data: IRevenueResponse
}

interface IGetRevenueByScreen {
  execute: (theaterId: string, filter: RevenueByFilter) => Promise<IGetRevenueByScreenResponse>
}
export {
  IGetRevenueByScreen
}