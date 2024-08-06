import { IResponse } from ".."

interface IGetTheaterScreenUsecase {
  execute: () => Promise<IResponse>
}
export {
  IGetTheaterScreenUsecase
}
