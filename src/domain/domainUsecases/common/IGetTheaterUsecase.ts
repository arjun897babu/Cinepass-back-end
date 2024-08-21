import { IResponse } from "..";

interface IGetTheaterUsecase {
  execute: (_id: string, city?: string) => Promise<IResponse>
}

export {
  IGetTheaterUsecase
}