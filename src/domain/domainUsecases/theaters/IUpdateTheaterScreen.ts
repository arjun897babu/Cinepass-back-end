import { IResponse2 } from "..";
import { ITheaterScreen } from "../../entities/theaters";
interface IUpdateTheaterScreenResponse extends IResponse2 {
  data: { screen: ITheaterScreen }
}
interface IUpdateTheaterScreen {
  execute: (screenId: string, payload: ITheaterScreen) => Promise<IUpdateTheaterScreenResponse>
}

export {
  IUpdateTheaterScreen
}