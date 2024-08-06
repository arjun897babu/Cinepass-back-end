import { IResponse } from "..";

interface IGetTheaterDetails{
  execute:(ownerId:string)=>Promise<IResponse>
}

export {
  IGetTheaterDetails
}