import { IResponse2 } from "..";
import { UserEntity } from "../../entities/user/IUserEntity";

interface IGetUserProfileResponse extends IResponse2 {
  data: { user: UserEntity }
}

interface IGetUserProfile {
  execute: (_id: string) => Promise<IGetUserProfileResponse>
}

export {
  IGetUserProfile
}