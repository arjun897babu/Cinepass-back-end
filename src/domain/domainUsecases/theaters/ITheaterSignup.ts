import { IResponse } from "..";
import { ITheaterOwnerEntity } from "../../entities/theaters";

interface ITheaterSignupEntity{
  execute:(data:ITheaterOwnerEntity)=>Promise<IResponse|null>
}

export {
  ITheaterSignupEntity
}