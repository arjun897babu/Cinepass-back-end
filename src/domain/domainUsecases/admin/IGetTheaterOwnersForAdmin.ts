import { IResponse } from "..";

interface IGetTheaterOwnersForAdmin {
  execute: () => Promise<IResponse>
}
export{
  IGetTheaterOwnersForAdmin
}