import { IResponse, IUpdateApproval } from "..";

interface IUpdateTheaterApproval {
  execute: (payload: IUpdateApproval) => Promise<IResponse>
}

export {
  IUpdateTheaterApproval
}