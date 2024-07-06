import { UserEntity } from "../../../domain/entities/user/IUserEntity";

interface IRepositories {
  signUp: (data: UserEntity) => Promise<UserEntity | null>
}

export {
  IRepositories
}