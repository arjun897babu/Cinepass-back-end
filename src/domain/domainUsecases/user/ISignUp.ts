import { IResponse } from "..";
import { UserEntity } from "../../entities/user/IUserEntity";

interface ISignUp {
  execute(data: UserEntity): Promise<IResponse | null>;
}

export {
  ISignUp
}