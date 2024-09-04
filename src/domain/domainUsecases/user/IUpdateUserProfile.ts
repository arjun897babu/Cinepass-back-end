import { IResponse2 } from "..";
import { UserEntity } from "../../entities/user/IUserEntity";

interface IUpdateUserProfileRespone extends IResponse2 {
  data: { user: Partial<UserEntity> }
}

interface IUpdateUserProfile {
  execute: (_id: string, payload: Partial<UserEntity>) => Promise<IUpdateUserProfileRespone>
}

export {
  IUpdateUserProfile
}