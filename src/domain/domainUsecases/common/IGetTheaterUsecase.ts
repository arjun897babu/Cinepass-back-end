import { IResponse } from "..";

interface IGetTheaterUsecase{
  execute:(_id:string)=>Promise<IResponse>
}

export {
  IGetTheaterUsecase
}