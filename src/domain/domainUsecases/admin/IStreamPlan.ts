import { IResponse2 } from "..";
import { IRental, IStreamPlanProps } from "../../../utils/interface";
import { IStreamRentalPlan } from "../../entities/admin/IStreamRentalPlan";


export interface IGetStreamPlanResponse {
  maxPage: number,
  data: IStreamRentalPlan[]
}

interface IStreamPlanResponse extends IResponse2 {
  data: IStreamRentalPlan | IGetStreamPlanResponse
}

interface IStreamPlan {
  execute: (streamPlanProps: IStreamPlanProps) => Promise<IStreamPlanResponse>
}

export {
  IStreamPlan
}