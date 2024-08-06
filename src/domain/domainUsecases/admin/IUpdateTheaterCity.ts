import { IResponse } from "..";
import { ICityUpdate } from "../../../utils/interface";

interface IUpdateTheaterCity {
  execute: (data: ICityUpdate) => Promise<IResponse>
}

export {
  IUpdateTheaterCity
}