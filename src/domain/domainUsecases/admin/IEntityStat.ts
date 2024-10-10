import { IResponse2 } from "..";
import { IGetTheaterOwnersCount, IGetUserCount } from "../../../utils/interface";
interface IEntityStatResponse  extends IResponse2 {
  data: {
    userStat: IGetUserCount,
    theaterStat: IGetTheaterOwnersCount,
  }
}

interface IEntityStat {
  execute: () => Promise<IEntityStatResponse>
}

export {
  IEntityStat
}