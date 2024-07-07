import { UserEntity } from "../../entities/user/IUserEntity";

interface ISignUp {
  execute(data: UserEntity): Promise<UserEntity | null>;
}

export {
  ISignUp
}