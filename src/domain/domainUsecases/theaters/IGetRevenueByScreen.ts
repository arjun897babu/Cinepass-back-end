import { IResponse2 } from "..";
import { RevenueByFilter } from "../../../utils/interface";

interface IGetRevenueByScreenResponse extends IResponse2 {
  data: any
}

interface IGetRevenueByScreen {
  execute: (theaterId: string, filter: RevenueByFilter) => Promise<IGetRevenueByScreenResponse>
}
export {
  IGetRevenueByScreen
}