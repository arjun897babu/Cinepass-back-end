import { IManageEntity, IUpdateApproval } from "../../../domain/domainUsecases";
import { AdminEntity } from "../../../domain/entities/admin/IAdmin";
import { ITheaterOwnerEntity } from "../../../domain/entities/theaters";
import { UserEntity } from "../../../domain/entities/user/IUserEntity";
import { Role } from "../../../utils/enum";

interface IAdminRepositories {
  findAdmin: (email: string) => Promise<AdminEntity | null>
  getEntityData: (role: Role.users | Role.theaters) => Promise<ITheaterOwnerEntity[] | UserEntity[] | []>
  updateTheaterApprovalByAdmin: (payload: IUpdateApproval) => Promise<IUpdateApproval | null>
  updateBlockStatus: (payload: IManageEntity) => Promise<IManageEntity | null>

}

export {
  IAdminRepositories
}