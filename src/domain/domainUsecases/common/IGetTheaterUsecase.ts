import { IResponse, IResponse2 } from "..";
import { ITheaterOwnerEntity } from "../../entities/theaters";

interface IGetTheaterResponse extends IResponse2 {
  data: {
    theater: (Partial<ITheaterOwnerEntity>[] | ITheaterOwnerEntity);
  };
}

interface IGetTheaterUsecase {
  execute: (_id: string, city?: string) => Promise<IGetTheaterResponse>
}

export {
  IGetTheaterUsecase
}