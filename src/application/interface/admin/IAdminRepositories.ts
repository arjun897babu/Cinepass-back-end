import { promises } from "dns";
import { IManageEntity, IUpdateApproval } from "../../../domain/domainUsecases";
import { IUpdateTheaterCity } from "../../../domain/domainUsecases/admin/IUpdateTheaterCity";
import { AdminEntity } from "../../../domain/entities/admin/IAdmin";
import { ITheaterOwnerEntity, ITheaters } from "../../../domain/entities/theaters";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";
import { MovieType, Role } from "../../../utils/enum";
import { ICityUpdate, IManageMovie } from "../../../utils/interface";
import { IMovie } from "../../../domain/entities/admin/ITheaterMovie";

interface IAdminRepositories {
  findAdmin: (email: string) => Promise<AdminEntity | null>
  getEntityData: (role: Role.users | Role.theaters) => Promise<ITheaterOwnerEntity[] | UserEntity[] | []>
  updateTheaterApprovalByAdmin: (payload: IUpdateApproval) => Promise<ITheaterOwnerEntity | null>
  updateBlockStatus: (payload: IManageEntity) => Promise<IManageEntity | null>
  createTheater: (data: ITheaters) => Promise<boolean>;
  updateTheaterCity: (data: ICityUpdate) => Promise<ICityUpdate|null>
  addMovie:(payload:IMovie,movieType:MovieType)=>Promise<IMovie>
  deleteMovie:(payload:IManageMovie)=>Promise<IManageMovie|null>

}

export {
  IAdminRepositories
}