import { IResponse } from "..";

interface IGetAllTheaterScreen {
  execute: (_id: string, amenity?: string) => Promise<IResponse>
}

export {
  IGetAllTheaterScreen
}