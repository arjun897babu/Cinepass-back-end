import { promises } from "dns";
import { IManageEntity, IUpdateApproval } from "../../../domain/domainUsecases";
import { IUpdateTheaterCity } from "../../../domain/domainUsecases/admin/IUpdateTheaterCity";
import { AdminEntity } from "../../../domain/entities/admin/IAdmin";
import { IMovie, ITheaterOwnerEntity, ITheaters } from "../../../domain/entities/theaters";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";
import { MovieType, Role } from "../../../utils/enum";
import { ICityUpdate } from "../../../utils/interface";

interface IAdminRepositories {
  findAdmin: (email: string) => Promise<AdminEntity | null>
  getEntityData: (role: Role.users | Role.theaters) => Promise<ITheaterOwnerEntity[] | UserEntity[] | []>
  updateTheaterApprovalByAdmin: (payload: IUpdateApproval) => Promise<ITheaterOwnerEntity | null>
  updateBlockStatus: (payload: IManageEntity) => Promise<IManageEntity | null>
  createTheater: (data: ITheaters) => Promise<boolean>;
  updateTheaterCity: (data: ICityUpdate) => Promise<ICityUpdate|null>
  addMovie:(payload:IMovie,movieType:MovieType)=>Promise<IMovie>

}

export {
  IAdminRepositories
}