import { IResponse } from "..";
import { ITheaterScreen } from "../../entities/theaters";

interface ITheaterScreenUsecase {
  execute: (_id: string, payload: ITheaterScreen) => Promise<IResponse>
}

export {
  ITheaterScreenUsecase
}