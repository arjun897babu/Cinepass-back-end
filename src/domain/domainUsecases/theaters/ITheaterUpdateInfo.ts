import { IResponse } from "..";
import { TheaterOwnerProfile, TheaterProfile } from "../../../utils/interface";

interface IUpdateTheaterInfo {
  execute: (_id: string, payload:(TheaterOwnerProfile | TheaterProfile)) => Promise<IResponse>
}

export {
  IUpdateTheaterInfo
}