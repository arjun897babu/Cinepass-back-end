import { IResponse2 } from "..";
import { IGetScreenCount, IGetShowCountByScreen, IGetTicketCount } from "../../../utils/interface";

interface IGetCountStatResponse extends IResponse2 {
  data: {
    screenStat: IGetScreenCount,
    showStat: IGetShowCountByScreen[],
    ticketStat: IGetTicketCount
  }
}

interface IGetCountStat {
  execute: (theaterId: string) => Promise<IGetCountStatResponse>
}

export {
  IGetCountStat
}