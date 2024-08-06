import { IResponse } from "..";

interface IGetCities {
  execute: () => Promise<IResponse>
}

export {
  IGetCities
}