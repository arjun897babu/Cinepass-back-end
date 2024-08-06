import { IResponse } from "..";
import { ITheaterUpdateInfoPayload } from "../../../utils/interface";

interface IUpdateTheaterInfo {
  execute: (_id: string,payload:ITheaterUpdateInfoPayload) => Promise<IResponse>
}

export {
  IUpdateTheaterInfo
}