import { IResponse } from "..";

interface IGetAllTheaterScreen{
  execute:(_id:string)=>Promise<IResponse>
}

export {
  IGetAllTheaterScreen
}