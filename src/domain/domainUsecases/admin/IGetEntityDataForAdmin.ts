import { IResponse, IResponse2 } from "..";
import { Role } from "../../../utils/enum";
import { ITheaterOwnerEntity } from "../../entities/theaters";
import { UserEntity } from "../../entities/user/IUserEntity";

export interface EntityResponse {
  maxPage: number,
  data: Partial<ITheaterOwnerEntity>[]|Partial<UserEntity>[];
}

interface IGetEntityDataForAdminResponse extends IResponse2 {
  data: {
    [Role.theaters]?: EntityResponse
    [Role.users]?: EntityResponse
  }
}

interface IGetEntityDataForAdmin {
  execute: (role: (Role.users | Role.theaters), pageNumber: number) => Promise<IGetEntityDataForAdminResponse>
}
export {
  IGetEntityDataForAdmin
}